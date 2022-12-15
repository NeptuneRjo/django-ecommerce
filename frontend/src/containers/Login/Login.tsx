import React, { useState } from 'react'
import { loginUser } from '../../API'
import { AccountInt } from '../../types'

type Props = {
	setUser: React.Dispatch<React.SetStateAction<AccountInt | undefined>>
}

const Login: React.FC<Props> = ({ setUser }: Props) => {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string>('')

	const submitLogin = async () => {
		if (username.length >= 1 && password.length >= 1) {
			const { data, error: errorMessage } = await loginUser(username, password)

			if (errorMessage) {
				setError(errorMessage)
			} else {
				setUser(data)
			}
		}
	}

	return (
		<div className='login-main'>
			<form onSubmit={() => submitLogin()}>
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
				<p className={`error-message ${error ? 'enabled' : ''}`}></p>
				<button type='submit'>Log in</button>
			</form>
		</div>
	)
}

export default Login
