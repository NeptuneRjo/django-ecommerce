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
	}
}

const Card: React.FC<Props> = ({ props }: Props) => {
	const { item, key, setIndex, index } = props
	const { item_id, item_title, item_image_url, item_price, item_rating } = item

	return (
		<motion.div
			layoutId={item_id}
			key={key}
			onClick={() => index === false && setIndex(item_id)}
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
					<motion.button>Add</motion.button>
				</motion.div>
			</motion.div>
		</motion.div>
	)
}

export default Card
