import React from 'react'
import { motion } from 'framer-motion'
import { StoreItemInt } from '../../types'
import './styles.css'
import CardBackdrop from '../ModalBackdrop/ModalBackdrop'

type Props = {
	props: {
		handleClose: () => void
		index: string | boolean
		item: StoreItemInt
	}
	buttonApi?: (arg: number) => Promise<void>
	buttonContent?: string
}

const CardExpanded: React.FC<Props> = ({
	props,
	buttonApi = undefined,
	buttonContent = '',
}: Props) => {
	const { handleClose, index, item } = props
	const {
		item_title,
		item_image_url,
		item_price,
		item_rating,
		item_description,
		item_category,
	} = item

	return (
		<>
			<motion.div className='card-expanded' key='modal'>
				<motion.div
					onClick={() => handleClose()}
					className='card-expanded__close'
				>
					X
				</motion.div>
				<motion.div className='card-expanded__container' layoutId={`${index}`}>
					<motion.img src={`${item_image_url}`} alt={`${item_title}`} />
					<motion.p className='card-expanded__title'>{item_title}</motion.p>
					<motion.div className='card-expanded__content'>
						<motion.p>{item_description}</motion.p>
						<motion.p>Categories: {item_category}</motion.p>
					</motion.div>
					<motion.div className='card-expanded__components'>
						<motion.p>${item_price}</motion.p>
						<motion.p>{item_rating} / 5 ★</motion.p>
					</motion.div>
					<motion.button
						className='button__2'
						onClick={() => (buttonApi ? buttonApi(Number(index)) : () => null)}
					>
						{buttonContent}
					</motion.button>
				</motion.div>
			</motion.div>
			<CardBackdrop handleClose={handleClose} />
		</>
	)
}

export default CardExpanded
