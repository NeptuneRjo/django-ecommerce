import React, { useState, useEffect, useCallback } from 'react'
import { StoreItemInt } from '../../types'
import { Card, CardExpanded } from '../../components'
import { getItems, addToCart } from '../../API'
import { PropagateLoader } from 'react-spinners'
import { AnimatePresence, LayoutGroup } from 'framer-motion'

import './styles.css'

type Props = {
	setCart: React.Dispatch<React.SetStateAction<StoreItemInt[]>>
	token: string
	cart: StoreItemInt[]
}

export const isItemInCart = (item: StoreItemInt, cart: StoreItemInt[]) => {
	const index = cart.map((elem) => elem.item_title).indexOf(item.item_title)

	return index > -1
}

const Storefront: React.FC<Props> = ({ token, setCart, cart }: Props) => {
	const [error, setError] = useState<string | undefined>(undefined)
	const [items, setItems] = useState<StoreItemInt[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [index, setIndex] = useState<boolean | string>(false)

	const item = items.find((item) => item.item_title === index)

	const addItem = async (index: number) => {
		const { data, error: resError } = await addToCart(token, items[index])

		if (resError) {
			setError(resError)
		} else {
			setCart(data.account.account_cart)
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
						{items.map((item, key) => (
							<Card
								props={{ item, key, cart }}
								addItem={addItem}
								motionProps={{ index, setIndex }}
							/>
						))}
					</div>
					<AnimatePresence>
						{index !== false && item && (
							<CardExpanded props={{ handleClose, index, item }} />
						)}
					</AnimatePresence>
				</LayoutGroup>
			)}
		</div>
	)
}

export default Storefront
