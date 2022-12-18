import React from 'react'
import { AccountInt } from '../../types'

import './styles.css'

type Props = {
	user: AccountInt | undefined
	setUserToken: React.Dispatch<React.SetStateAction<string>>
	setUser: React.Dispatch<React.SetStateAction<AccountInt | undefined>>
}

const Navbar: React.FC<Props> = ({ user, setUser, setUserToken }) => {
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
					<li id='nav-user'>{user.account.user.username}</li>
					<li>
						<a href='#/cart'>Cart</a>
					</li>
					<li>
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
