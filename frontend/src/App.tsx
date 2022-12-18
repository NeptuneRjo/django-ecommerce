import React, { useEffect, useState } from 'react'
import { getItems, getAccount } from './API'
import { AccountInt, StoreItemInt } from './types'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar, Storefront, Login, Register, Cart } from './containers'

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
				setCart(data.account.account_cart)
				window.sessionStorage.setItem('loggedUser', JSON.stringify(data))
				window.sessionStorage.setItem('token', JSON.stringify(userToken))
			}

			// Set the user if there is one stored in sessionStorage
			const sessionUser = sessionStorage.getItem('loggedUser')
			const sessionToken = sessionStorage.getItem('token')

			// content of sessionStore is a json string; undefined NEEDS to be a string
			if (sessionUser !== null && sessionUser !== 'undefined') {
				const obj = JSON.parse(sessionUser)

				setUser(obj)
				setCart(obj.account.account_cart)
			}

			if (sessionToken !== null && sessionToken.length > 0) {
				setUserToken(JSON.parse(sessionToken))
			}
		})()
	}, [userToken])

	return (
		<div className='app-main'>
			<Navbar user={user} setUser={setUser} setUserToken={setUserToken} />
			<Routes>
				<Route
					path='/store'
					element={
						<Storefront items={items} token={userToken} setCart={setCart} />
					}
				/>
				<Route
					path='/login'
					element={<Login user={user} setUserToken={setUserToken} />}
				/>
				<Route
					path='/register'
					element={<Register setUserToken={setUserToken} user={user} />}
				/>
				<Route
					path='/cart'
					element={<Cart cart={cart} setCart={setCart} token={userToken} />}
				/>
				<Route path='/' element={<Navigate to='/store' />} />
			</Routes>
		</div>
	)
}

export default App
