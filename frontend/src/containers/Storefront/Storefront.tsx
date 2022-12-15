import React, { useState } from 'react'
import { StoreItemInt } from '../../types'
import { StoreItem } from '../../components'

type Props = {
	items: StoreItemInt[]
	cart: StoreItemInt[]
}

export const updateUserCart = () => {}

const Storefront: React.FC<Props> = ({ items, cart }: Props) => {
	const [toAdd, setToAdd] = useState<StoreItemInt[]>([])
	const [toRemove, setToRemove] = useState<StoreItemInt[]>([])

	return (
		<div className='storefront-main'>
			{items.length === 0 ? (
				<div className='message-container'>
					<p className='message'>No items in the store right now.</p>
				</div>
			) : (
				<div className='storefront-grid'>
					{items.map((item) => (
						<div className='grid-item'>
							<StoreItem item={item} />
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Storefront
