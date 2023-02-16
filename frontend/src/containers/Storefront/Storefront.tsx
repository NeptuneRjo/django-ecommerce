import React, { useState, useEffect, useCallback } from 'react'
import { StoreItemInt } from '../../types'
import { Card, CardExpanded } from '../../components'
import { updateCart, getItems } from '../../API'
import { PropagateLoader } from 'react-spinners'
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion'

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

	const addToCart = async (item: StoreItemInt) => {
		if (!isItemInCart(item, cart)) {
			const { data, errors } = await updateCart(token, [item])

			setError(errors?.to_add)
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
		document.body.classList.add('card-open')
	} else {
		document.body.classList.remove('card-open')
	}

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
				<LayoutGroup>
					<div id='store-grid'>
						{items.map((item, key) => (
							<Card props={{ addToCart, item, key, index, setIndex }} />
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
