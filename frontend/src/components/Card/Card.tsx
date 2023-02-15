import { motion } from 'framer-motion'
import React from 'react'
import { StoreItemInt } from '../../types'
import './styles.css'

type Props = {
	props: {
		item: StoreItemInt
		key: number
		setIndex: React.Dispatch<React.SetStateAction<string | boolean>>
		index: string | boolean
		addToCart: (item: StoreItemInt) => void
	}
}

const Card: React.FC<Props> = ({ props }: Props) => {
	const { item, key, setIndex, index, addToCart } = props
	const { item_title, item_image_url, item_price, item_rating } = item

	return (
		<motion.div
			layoutId={`${key}`}
			key={key}
			onClick={() => index === false && setIndex(item_title)}
			className='card'
		>
			<motion.div className='card__container'>
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
					<motion.button className='button__2' onClick={() => addToCart(item)}>
						Add to Cart
					</motion.button>
				</motion.div>
			</motion.div>
		</motion.div>
	)
}

export default Card
