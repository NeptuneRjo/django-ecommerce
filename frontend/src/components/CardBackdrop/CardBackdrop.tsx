import React from 'react'
import { motion } from 'framer-motion'
import './styles.css'

type Props = {
	handleClose: () => void
}

const CardBackdrop: React.FC<Props> = ({ handleClose }: Props) => {
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

export default CardBackdrop
