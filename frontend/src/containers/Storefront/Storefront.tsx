import React, { useState } from 'react'
import { StoreItemInt } from '../../types'
import { StoreItem } from '../../components'
import { updateCart } from '../../API'

import './styles.css'

type Props = {
	items: StoreItemInt[]
	setCart: React.Dispatch<React.SetStateAction<StoreItemInt[]>>
	token: string
	cart: StoreItemInt[]
}

const Storefront: React.FC<Props> = ({
	items,
	token,
	setCart,
	cart,
}: Props) => {
	const [error, setError] = useState<string>('')
	const [addedIndex, setAddedIndex] = useState<number | undefined>()

	const getCartIndex = (item: StoreItemInt) => {
		const index = cart.map((elem) => elem.item_name).indexOf(item.item_name)

		return index > -1
	}

	const addToCart = async (index: number) => {
		const update = [items[index]]

		if (!getCartIndex(items[index])) {
			const { data, errors } = await updateCart(token, update)

			if (errors) {
				setError(errors.to_add)
			} else {
				setCart(data.account.account_cart)
			}
		}
	}

	return (
		<div id='store-main'>
			{items.length === 0 ? (
				<div className='message-container'>
					<p className='message'>No items in the store right now.</p>
				</div>
			) : (
				<div id='store-grid'>
					{items.map((item, index) => (
						<div id='grid-item' key={index}>
							<StoreItem item={item} />

							{token.length > 1 ? (
								<button className='button' onClick={() => addToCart(index)}>
									{getCartIndex(item) ? '✔' : `Add to cart`}
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
