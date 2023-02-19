import { motion } from 'framer-motion'
import React from 'react'
import { StoreItemInt } from '../../types'
import './styles.css'

type Props = {
	props: {
		item: StoreItemInt
		key: number
	}
	motionProps?: {
		setIndex: React.Dispatch<React.SetStateAction<string | boolean>>
		index: string | boolean
	}
	addItem?: (index: number) => Promise<void> | undefined
	removeItem?: (index: number) => Promise<void> | undefined
}

const Card: React.FC<Props> = ({
	props,
	motionProps = undefined,
	addItem = undefined,
	removeItem = undefined,
}: Props) => {
	const { item, key } = props
	const { item_title, item_image_url, item_price, item_rating } = item

	return (
		<motion.div className='card'>
			<motion.div
				className='card__container'
				layoutId={`${key}`}
				key={key}
				onClick={() =>
					motionProps?.index === false && motionProps.setIndex(item_title)
				}
			>
				<motion.img src={`${item_image_url}`} alt={`${item_title}`} />

				<motion.div className='card__container__cmpnts'>
					<motion.p className='card__title'>{item_title}</motion.p>
					<motion.ul>
						<motion.li>
							<motion.p className='card__price'>${item_price}</motion.p>
						</motion.li>
						<motion.li>
							<motion.p className='card__rating'>{item_rating} / 5 ★</motion.p>
						</motion.li>
					</motion.ul>
				</motion.div>
			</motion.div>
			{addItem && (
				<motion.button className='button__2' onClick={() => addItem(key)}>
					Add to Cart
				</motion.button>
			)}
			{removeItem && (
				<motion.button className='button__2' onClick={() => removeItem(key)}>
					Remove Item
				</motion.button>
			)}
		</motion.div>
	)
}

export default Card
