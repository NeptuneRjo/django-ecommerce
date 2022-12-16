import React, { useState } from 'react'
import { loginUser } from '../../API'
import { useNavigate } from 'react-router-dom'
import { AccountInt } from '../../types'

type Props = {
	setUserToken: React.Dispatch<React.SetStateAction<string>>
	user: AccountInt | undefined
}

const Login: React.FC<Props> = ({ user, setUserToken }: Props) => {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string>('')

	const navigate = useNavigate()

	const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (username.length >= 1 && password.length >= 1) {
			const { data, error: errorMessage } = await loginUser(username, password)

			if (errorMessage) {
				setError(errorMessage)
			} else {
				setUserToken(data.token)

				setUsername('')
				setPassword('')

				navigate('/store')
			}
		}
	}

	return (
		<div className='login-main'>
			<h4 className='title'>Log in</h4>
			{user === undefined ? (
				<form onSubmit={(e) => submitLogin(e)}>
					<div className='login-section'>
						<label htmlFor='username'>Enter your username / email:</label>
						<input
							type='text'
							name='username'
							onChange={(e) => setUsername(e.target.value)}
							value={username}
						/>
					</div>
					<div className='login-section'>
						<label htmlFor='password'>Enter your password:</label>
						<input
							type='password'
							name='password'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</div>
					<p className={`error-message ${error ? 'enabled' : ''}`}>{error}</p>
					<button type='submit'>Log in</button>
				</form>
			) : (
				<div className='message-container'>
					<p className='message'>You are already signed in.</p>
					<button>Navigate to the store front</button>
					<button>View your cart</button>
				</div>
			)}
		</div>
	)
}

export default Login
