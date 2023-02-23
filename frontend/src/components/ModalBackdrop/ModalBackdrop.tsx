import React from 'react'
import { motion } from 'framer-motion'
import './styles.css'

/** The backdrop to be rendered with modals. Allows for closing of the AnimatePresence if the background is clicked
 *
 * @example
 * ```javascript
 * const handleClose = useCallback(() => {
 * 	setIndex(false)
 * }, [])
 *
 * <ModalBackdrop
 *  handleClose={handleClose}
 * />
 * ```
 */

const ModalBackdrop: React.FC<{
	handleClose: () => void
}> = ({ handleClose }) => {
	return (
		<motion.div
			key='backdrop'
			onClick={handleClose}
			className='card-backdrop'
			variants={{
				hidden: {
					opacity: 0,
					transition: {
						duration: 0.16,
					},
				},
				visible: {
					opacity: 0.8,
					transition: {
						delay: 0.04,
						duration: 0.2,
					},
				},
			}}
			initial='hidden'
			exit='hidden'
			animate='visible'
		/>
	)
}

export default ModalBackdrop
