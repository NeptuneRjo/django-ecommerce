import React, { useState } from 'react'
import { StoreItemInt } from '../../types'
import { updateCart, removeFromCart } from '../../API'
import { Card } from '../../components'

import './styles.css'

type Props = {
	cart: StoreItemInt[]
	setCart: React.Dispatch<React.SetStateAction<StoreItemInt[]>>
	token: string
}

const Cart: React.FC<Props> = ({ cart, setCart, token }: Props) => {
	const [error, setError] = useState<string>('')

	const removeItem = async (index: number) => {
		const { data, error: resError } = await removeFromCart(token, cart[index])

		if (resError) {
			setError(resError)
		} else {
			setCart(data.account.account_cart)
		}
	}

	let cartTotal = 0

	for (let item of cart) {
		cartTotal += Number(item.item_price)
	}

	// const itemInCart = cart.find((elem) => elem.item_title === item.item_title)

	const isItemInCart = (item: StoreItemInt) => {
		const itemInCart = cart.find((elem) => elem.item_title === item.item_title)

		if (itemInCart) {
			return true
		} else {
			return false
		}
	}

	return (
		<div className='cart'>
			<h3>View and edit your cart</h3>
			{cart.length > 0 ? (
				<div className='cart__container'>
					<div className='cart__items'>
						{cart.map((item, key) => (
							<Card
								props={{ item, key }}
								buttonApi={removeItem}
								buttonContent='Remove'
							/>
						))}
					</div>
					<div className='cart__info'>
						<h4>Checkout</h4>
						<ul>
							<li>Quantity: {cart.length}</li>
							<li>Total: ${cartTotal}</li>
						</ul>
						<button className='button__1'>Check out</button>
					</div>
				</div>
			) : (
				<div className='cart__container'>
					<div className='cart__empty'></div>
				</div>
			)}
		</div>
	)
}

export default Cart
