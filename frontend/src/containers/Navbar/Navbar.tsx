import React from 'react'
import { AccountInt } from '../../types'

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
		<div className='navbar-main'>
			<h4 className='title'>
				<a href='#/store'>DJANGO GPU's</a>
			</h4>
			{user === undefined ? (
				<div className='navbar-content'>
					<button>
						<a href='/#/register'>Register</a>
					</button>
					<button>
						<a href='/#/login'>Log in</a>
					</button>
				</div>
			) : (
				<div className='navbar-content'>
					<h6>{user.account.user.username}</h6>
					<button>
						<a href='/#/cart'>Cart</a>
					</button>
					<button>
						<a onClick={() => logout()} href='#'>
							Log out
						</a>
					</button>
				</div>
			)}
		</div>
	)
}

export default Navbar
