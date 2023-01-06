import React from 'react'
import { AccountInt, StoreItemInt } from '../../types'
import { RiShoppingCart2Line, RiUser3Line } from 'react-icons/ri'

import './styles.css'

type Props = {
	user: AccountInt | undefined
	setUserToken: React.Dispatch<React.SetStateAction<string>>
	setUser: React.Dispatch<React.SetStateAction<AccountInt | undefined>>
	cart: StoreItemInt[]
}

const Navbar: React.FC<Props> = ({ user, setUser, setUserToken, cart }) => {
	const logout = () => {
		setUser(undefined)
		setUserToken('')

		window.sessionStorage.setItem('loggedUser', JSON.stringify(undefined))
		window.sessionStorage.setItem('token', JSON.stringify(''))
	}

	return (
		<nav id='nav-main'>
			<h4 id='nav-title'>
				<a href='#/store'>DJANGO GPU's</a>
			</h4>
			{!user ? (
				<ul id='nav-content'>
					<li>
						<a href='#/register'>Register</a>
					</li>
					<li>
						<a href='#/login'>Log in</a>
					</li>
				</ul>
			) : (
				<ul id='nav-content'>
					<li id='nav-user'>
						{user.account.user.username} <RiUser3Line />
					</li>
					<li id='nav-cart'>
						<a href='#/cart'>
							{cart.length}
							<RiShoppingCart2Line />
						</a>
					</li>
					<li id='nav-logout'>
						<a href='#' onClick={() => logout()}>
							Logout
						</a>
					</li>
				</ul>
			)}
		</nav>
	)
}

export default Navbar
