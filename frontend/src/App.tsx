import React, { useEffect, useState } from 'react'
import { getItems } from './API'
import { AccountInt, StoreItemInt } from './types'

import './App.css'

function App() {
	const [items, setItems] = useState<StoreItemInt[]>([])
	const [userToken, setUserToken] = useState<string>('')
	const [user, setUser] = useState<undefined | AccountInt>(undefined)
	const [cart, setCart] = useState<StoreItemInt[]>([])

	useEffect(() => {
		;(async () => {
			const fetchedItems = await getItems()

			setItems(fetchedItems)
		})()
	}, [])

	return <div className='App'></div>
}

export default App
