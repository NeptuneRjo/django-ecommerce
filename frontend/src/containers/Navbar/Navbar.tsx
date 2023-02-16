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
		<nav className='nav'>
			<h3>
				<a href='#/store'>BargainBay</a>
			</h3>
			{!user ? (
				<div className='nav__content'>
					<ul className='nav__content__links'>
						<li>
							<a href='#/store'>Store</a>
						</li>
						<li>
							<a href='#/about'>About</a>
						</li>
					</ul>
					<ul className='nav__content__buttons'>
						<li>
							<a href='#/login'>Login</a>
						</li>
						<li className='button__1'>
							<a href='#/register'>Register</a>
						</li>
					</ul>
				</div>
			) : (
				<div className='nav__content'>
					<ul className='nav__content__links'>
						<li className='nav--focus'>
							{user.account.user.username} <RiUser3Line />
						</li>
					</ul>
					<ul className='nav__content__buttons'>
						<li>
							<a href='#/cart'>
								{cart.length}
								<RiShoppingCart2Line />
							</a>
						</li>
						<li>
							<a href='#' onClick={() => logout()}>
								Logout
							</a>
						</li>
					</ul>
				</div>
			)}
		</nav>
	)
}

export default Navbar
