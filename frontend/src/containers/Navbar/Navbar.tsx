import React, { useCallback, useState } from 'react'
import { AccountInt, StoreItemInt } from '../../types'
import { RiShoppingCart2Line, RiUser3Line } from 'react-icons/ri'
import { ModalBackdrop, Login, Register } from '../../components'
import { AnimatePresence, motion } from 'framer-motion'

import './styles.css'

type Props = {
	props: {
		user: AccountInt | undefined
		setUserToken: React.Dispatch<React.SetStateAction<string>>
		setUser: React.Dispatch<React.SetStateAction<AccountInt | undefined>>
		cart: StoreItemInt[]
	}
}

const Navbar: React.FC<Props> = ({ props }) => {
	const { user, setUser, setUserToken, cart } = props

	const [index, setIndex] = useState<boolean | string>(false)

	const logout = () => {
		setUser(undefined)
		setUserToken('')

		window.sessionStorage.setItem('loggedUser', JSON.stringify(undefined))
		window.sessionStorage.setItem('token', JSON.stringify(''))
	}

	const handleClose = useCallback(() => {
		setIndex(false)
	}, [])

	if (index !== false) {
		document.body.classList.add('modal-open')
	} else {
		document.body.classList.remove('modal-open')
	}

	console.log(user)

	return (
		<nav className='nav'>
			<h3>
				<a href='#/store'>BargainBay</a>
			</h3>
			<div className='nav__content'>
				<ul className='nav__content__links'>
					<li>
						<a href='#/store'>Store</a>
					</li>
					<li>
						<a href='#/about'>About</a>
					</li>
				</ul>
				{user ? (
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
				) : (
					<ul className='nav__content__buttons'>
						<li>
							<motion.div onClick={() => index === false && setIndex('login')}>
								Login
							</motion.div>
						</li>
						<li className='button__1'>
							<motion.div
								onClick={() => index === false && setIndex('register')}
							>
								Register
							</motion.div>
						</li>
					</ul>
				)}
			</div>
			<AnimatePresence>
				{index === 'login' && (
					<>
						<Login props={{ setUserToken, handleClose, user }} />
						<ModalBackdrop handleClose={handleClose} />
					</>
				)}
				{index === 'register' && (
					<>
						<Register setUserToken={setUserToken} user={user} />
						<ModalBackdrop handleClose={handleClose} />
					</>
				)}
			</AnimatePresence>
		</nav>
	)
}

export default Navbar
