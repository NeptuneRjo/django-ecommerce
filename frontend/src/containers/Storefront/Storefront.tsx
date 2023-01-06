import React, { useState, useEffect } from 'react'
import { StoreItemInt } from '../../types'
import { StoreItem } from '../../components'
import { updateCart, getItems } from '../../API'
import { PropagateLoader } from 'react-spinners'

import './styles.css'

type Props = {
	setCart: React.Dispatch<React.SetStateAction<StoreItemInt[]>>
	token: string
	cart: StoreItemInt[]
}

export const isItemInCart = (item: StoreItemInt, cart: StoreItemInt[]) => {
	const index = cart.map((elem) => elem.item_name).indexOf(item.item_name)

	return index > -1
}

const Storefront: React.FC<Props> = ({ token, setCart, cart }: Props) => {
	const [error, setError] = useState<string | undefined>(undefined)
	const [items, setItems] = useState<StoreItemInt[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	const addToCart = async (item: StoreItemInt) => {
		if (!isItemInCart(item, cart)) {
			const { data, errors } = await updateCart(token, [item])

			setError(errors?.to_add)
			setCart(data.account.account_cart)
		}
	}

	useEffect(() => {
		;(async () => {
			if (items.length === 0) {
				const fetchedItems = await getItems()

				setItems(fetchedItems)
				setLoading(false)
			}
		})()
	}, [])

	return (
		<div id='store-main'>
			{items.length === 0 ? (
				<div className='message-container'>
					<p className='message'>
						{loading ? (
							<PropagateLoader color='#63ccca' />
						) : (
							<>No items in the store right now.</>
						)}
					</p>
				</div>
			) : (
				<div id='store-grid'>
					{items.map((item, index) => (
						<div id='grid-item' key={index}>
							<StoreItem item={item} />

							{token.length > 1 ? (
								<button className='button' onClick={() => addToCart(item)}>
									{isItemInCart(item, cart) ? '✔' : `Add to cart`}
								</button>
							) : (
								<button className='button'>
									<a href='#/login'>Log in to add to cart</a>
								</button>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Storefront
