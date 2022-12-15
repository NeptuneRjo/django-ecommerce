import React, { useEffect, useState } from 'react'
import { getItems, getAccount } from './API'
import { AccountInt, StoreItemInt } from './types'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar, Storefront, Login } from './containers'

import './App.css'

function App() {
	const [items, setItems] = useState<StoreItemInt[]>([])
	const [userToken, setUserToken] = useState<string>('')
	const [user, setUser] = useState<undefined | AccountInt>(undefined)
	const [cart, setCart] = useState<StoreItemInt[]>([])

	useEffect(() => {
		;(async () => {
			// Get Items
			if (items.length === 0) {
				const fetchedItems = await getItems()

				setItems(fetchedItems)
			}

			// Get user if there is a token present
			if (userToken.length > 0) {
				const { data, error } = await getAccount(userToken)

				setUser(data)
			}

			// Set the user if there is one stored in sessionStorage
			const sessionUser = window.sessionStorage.getItem('loggedUser')

			if (sessionUser) {
				setUser(JSON.parse(sessionUser))
			}
		})()
	}, [userToken])

	return (
		<div className='app-main'>
			<Navbar user={user} />
			<Routes>
				<Route
					path='/store'
					element={<Storefront items={items} cart={cart} setCart={setCart} />}
				/>
				<Route path='/login' element={<Login setUserToken={setUserToken} />} />
				<Route path='/register' />
				<Route path='/' element={<Navigate to='/store' />} />
			</Routes>
		</div>
	)
}

export default App
