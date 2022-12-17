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

	const addToCart = async (index: number) => {
		const update = [items[index]]

		const { data, errors } = await updateCart(token, update)

		if (errors) {
			setError(errors.to_add)
		} else {
			setCart(data.account.account_cart)
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
						<div className='grid-item'>
							<StoreItem item={item} key={index} />
							{token.length > 1 && (
								<button onClick={() => addToCart(index)}>Add to cart</button>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Storefront
