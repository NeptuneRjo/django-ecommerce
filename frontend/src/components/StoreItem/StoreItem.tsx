import React from 'react'
import { StoreItemInt } from '../../types'

import './styles.css'

type Props = {
	item: StoreItemInt
}

const StoreItem: React.FC<Props> = ({ item }: Props) => {
	return (
		<div id='storeitem-main'>
			<div id='storeitem-image'>
				<img alt={item.item_name} src={item.item_thumb_url} />
			</div>
			<div id='storeitem-info'>
				<p id='name-desktop'>{item.item_name}</p>
				<p id='name-mobile'>{item.item_name.slice(0, 61)}...</p>
				<p id='price'>${item.item_price}</p>
			</div>
		</div>
	)
}

export default StoreItem
