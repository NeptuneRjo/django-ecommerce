import React, { useEffect, useState } from 'react'
import { getItems } from './API'
import { Account, StoreItem } from './types'

import './App.css'

function App() {
	const [items, setItems] = useState<StoreItem[]>([])
	const [userToken, setUserToken] = useState<string>('')
	const [user, setUser] = useState<undefined | Account>(undefined)

	useEffect(() => {
		;(async () => {
			const fetchedItems = await getItems()

			setItems(fetchedItems)
		})()
	}, [])

	return <div className='App'></div>
}

export default App
