import React, { useCallback, useState } from 'react'
import { AccountInt, StoreItemInt } from '../../types'
import { ModalBackdrop, Login, Register } from '../../components'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import './styles.css'

type Props = {
	props: {
		user: AccountInt | undefined
		setUserToken: React.Dispatch<React.SetStateAction<string>>
		setUser: React.Dispatch<React.SetStateAction<AccountInt | undefined>>
	}
}

const Navbar: React.FC<Props> = ({ props }) => {
	const { user, setUser, setUserToken } = props

	const [index, setIndex] = useState<boolean | string>(false)

	const navigate = useNavigate()

	const logout = () => {
		setUser(undefined)
		setUserToken('')

		window.sessionStorage.setItem('loggedUser', JSON.stringify(undefined))
		window.sessionStorage.setItem('token', JSON.stringify(''))

		navigate('#/store')
	}

	const handleClose = useCallback(() => {
		setIndex(false)
	}, [])

	if (index !== false) {
		document.body.classList.add('modal-open')
	} else {
		document.body.classList.remove('modal-open')
	}

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
					<ul className='nav__content__buttons'>
						<li>
							<a>{user.account.user.username}</a>
						</li>
						<li>
							<a href='#/cart'>Cart</a>
						</li>
						<li>
							<a onClick={() => logout()}>Logout</a>
						</li>
					</ul>
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
						<Login props={{ setUserToken, handleClose }} />
						<ModalBackdrop handleClose={handleClose} />
					</>
				)}
				{index === 'register' && (
					<>
						<Register props={{ setUserToken, handleClose }} />
						<ModalBackdrop handleClose={handleClose} />
					</>
				)}
			</AnimatePresence>
		</nav>
	)
}

export default Navbar
