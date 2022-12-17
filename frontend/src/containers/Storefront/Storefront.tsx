import React, { useState } from 'react'
import { StoreItemInt } from '../../types'
import { StoreItem } from '../../components'
import { updateCart } from '../../API'

type Props = {
	items: StoreItemInt[]
	setCart: React.Dispatch<React.SetStateAction<StoreItemInt[]>>
	token: string
}

const Storefront: React.FC<Props> = ({ items, token, setCart }: Props) => {
	const [error, setError] = useState<string>('')
	const [addedIndex, setAddedIndex] = useState<number | undefined>()

	const updateIndex = (index: number) => {
		setAddedIndex(index)

		setTimeout(() => {
			setAddedIndex(undefined)
		}, 3000)
	}

	const addToCart = async (index: number) => {
		const update = [items[index]]

		const { data, errors } = await updateCart(token, update)

		if (errors) {
			setError(errors.to_add)
		} else {
			setCart(data.account.account_cart)

			updateIndex(index)
		}
	}

	return (
		<div className='storefront-main'>
			{items.length === 0 ? (
				<div className='message-container'>
					<p className='message'>No items in the store right now.</p>
				</div>
			) : (
				<div className='storefront-grid'>
					{items.map((item, index) => (
						<div className='grid-item' key={index}>
							<StoreItem item={item} />
							{token.length > 1 && (
								<button onClick={() => addToCart(index)}>
									{addedIndex === index ? `Added to cart` : `Add to cart`}
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
