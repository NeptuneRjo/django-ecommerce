import React from 'react'
import { AccountInt } from '../../types'

type Props = {
	user: AccountInt | undefined
}

const Navbar: React.FC<Props> = ({ user }) => {
	return (
		<div className='navbar-main'>
			<h4 className='title'>
				<a href='#/store'>DJANGO GPU's</a>
			</h4>
			{user === undefined ? (
				<div className='navbar-content'>
					<button>Register</button>
					<button>Log in</button>
				</div>
			) : (
				<div className='navbar-content'>
					<button>Cart</button>
					<button>Log out</button>
				</div>
			)}
		</div>
	)
}

export default Navbar
