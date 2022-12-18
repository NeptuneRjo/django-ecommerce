import React, { useState } from 'react'
import { StoreItemInt } from '../../types'
import { StoreItem } from '../../components'
import { updateCart } from '../../API'

type Props = {
	cart: StoreItemInt[]
	setCart: React.Dispatch<React.SetStateAction<StoreItemInt[]>>
	token: string
}

const Cart: React.FC<Props> = ({ cart, setCart, token }: Props) => {
	const [toRemove, setToRemove] = useState<StoreItemInt[]>([])
	const [error, setError] = useState<string>('')

	const removeFromCart = async () => {
		if (toRemove.length > 0) {
			const { data, errors } = await updateCart(token, [], toRemove)

			if (errors) {
				setError(errors.to_add)
			} else {
				setCart(data.account.account_cart)
			}
		}
	}

	const markForRemoval = (item: StoreItemInt) => {
		const index = toRemove.map((elem) => elem.item_name).indexOf(item.item_name)

		if (index > -1) {
			const cloneToRemove = toRemove
			cloneToRemove.splice(index, 1)

			setToRemove([...cloneToRemove])
		} else {
			setToRemove([...toRemove, item])
		}
	}

	return (
		<div className='cart-main'>
			<h4 className='title'>Cart</h4>
			{cart.length === 0 ? (
				<div className='message-container'>
					<p className='message'>No items in the store right now.</p>
				</div>
			) : (
				<div className='cart-container'>
					<div className='cart-grid'>
						{cart.map((item, index) => (
							<div className='grid-item' key={index}>
								<StoreItem item={item} />
								<button className='button' onClick={() => markForRemoval(item)}>
									{toRemove.indexOf(item) > -1 ? `Undo` : `Mark for removal`}
								</button>
							</div>
						))}
					</div>
					<div className='cart-controls'>
						<button className='button' onClick={() => removeFromCart()}>
							Update Cart
						</button>
					</div>
					<p className={`error-message ${error ? 'enabled' : ''}`}>{error}</p>
				</div>
			)}
		</div>
	)
}

export default Cart
