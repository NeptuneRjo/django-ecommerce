import React from 'react'
import { motion } from 'framer-motion'
import { StoreItemInt } from '../../types'
import './styles.css'
import CardBackdrop from '../ModalBackdrop/ModalBackdrop'

/**
 * The AnimatePresence Component to be used along side the `<Card />` component.
 *
 * ```javascript
 * const handleClose = useCallback(() => {
 * 	setIndex(false)
 * }, [])
 *
 * <CardExpanded
 * 	props={{handleClose, item, index}}
 * 	buttonApi={function(key: string | number)}
 * 	buttonContent=''
 * />
 *
 * ```
 */

const CardExpanded: React.FC<{
	/** The item, its index, and the function to close the AnimatePresence */
	props: {
		handleClose: () => void
		index: string | boolean
		item: StoreItemInt
	}
	/** API call tied to the button */
	buttonApi?: (key: number | string) => Promise<void>
	buttonContent?: string
}> = ({ props, buttonApi = undefined, buttonContent = '' }) => {
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
						onClick={() => (buttonApi ? buttonApi(item_title) : () => null)}
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
