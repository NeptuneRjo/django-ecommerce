import React from 'react'
import { StoreItemInt } from '../../types'

type Props = {
	item: StoreItemInt
}

const StoreItem: React.FC<Props> = ({ item }: Props) => {
	return (
		<div className='storeitem-main'>
			<div className='storeitem-image'>
				<img src={item.item_thumb_url} />
			</div>
			<div className='storeitem-info'>
				<p className='name'>{item.item_name}</p>
				<p className='price'>{item.item_price}</p>
			</div>
		</div>
	)
}

export default StoreItem
