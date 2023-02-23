import React, { useState, useEffect, useCallback } from 'react'
import { StoreItemInt } from '../../types'
import { Card, CardExpanded } from '../../components'
import { getItems, addToCart } from '../../API'
import { PropagateLoader } from 'react-spinners'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import './styles.css'

export const isItemInCart = (item: StoreItemInt, cart: StoreItemInt[]) => {
	const index = cart.map((elem) => elem.item_title).indexOf(item.item_title)

	return index > -1
}

const Storefront: React.FC<{
	setCart: React.Dispatch<React.SetStateAction<StoreItemInt[]>>
	token: string
	cart: StoreItemInt[]
}> = ({ token, setCart, cart }) => {
	const [error, setError] = useState<string | undefined>(undefined)
	const [items, setItems] = useState<StoreItemInt[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [index, setIndex] = useState<boolean | string>(false)

	const item = items.find((item) => item.item_title === index)

	const navigate = useNavigate()

	const addItem = async (key: number | string) => {
		if (typeof key === 'number') {
			const { data, error: resError } = await addToCart(token, items[key])

			if (resError) {
				setError(resError)
			} else {
				setCart(data.account.account_cart)
			}
		} else {
			const { data, error: resError } = await addToCart(
				token,
				items[items.map((item) => item.item_title).indexOf(key)]
			)

			if (resError) {
				setError(resError)
			} else {
				setCart(data.account.account_cart)
			}
		}
	}

	const handleClose = useCallback(() => {
		setIndex(false)
	}, [])

	useEffect(() => {
		;(async () => {
			if (items.length === 0) {
				const fetchedItems = await getItems()

				setItems(fetchedItems)
				setLoading(false)
			}
		})()
	}, [])

	if (item) {
		document.body.classList.add('modal-open')
	} else {
		document.body.classList.remove('modal-open')
	}

	const isItemInCart = (item: StoreItemInt) => {
		const itemInCart = cart.find((elem) => elem.item_title === item.item_title)

		if (itemInCart) {
			return true
		} else {
			return false
		}
	}

	return (
		<div className='store'>
			{items.length === 0 ? (
				<div className='message'>
					<div className='message__content'>
						{loading ? (
							<PropagateLoader color='#574ae2' />
						) : (
							<p>No items in the store right now.</p>
						)}
					</div>
				</div>
			) : (
				<LayoutGroup>
					<div className='store__grid'>
						{items.map((item, key) =>
							isItemInCart(item) ? (
								<Card
									props={{ item, key }}
									buttonContent='In cart'
									setIndex={setIndex}
									index={index}
								/>
							) : (
								<Card
									props={{ item, key }}
									buttonApi={token ? addItem : undefined}
									buttonContent={`${
										token ? 'Add to Cart' : 'Log in to add to cart'
									}`}
									setIndex={setIndex}
									index={index}
								/>
							)
						)}
					</div>
					<AnimatePresence>
						{index &&
							item &&
							(isItemInCart(item) ? (
								<CardExpanded
									props={{ handleClose, index, item }}
									buttonContent='In cart'
								/>
							) : (
								<CardExpanded
									props={{ handleClose, index, item }}
									buttonContent={`${
										token ? 'Add to Cart' : 'Log in to add to cart'
									}`}
									buttonApi={token ? addItem : undefined}
								/>
							))}
					</AnimatePresence>
				</LayoutGroup>
			)}
		</div>
	)
}

export default Storefront
