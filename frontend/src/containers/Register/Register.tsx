import React, { useState } from 'react'
import { AccountInt } from '../../types'
import { registerUser } from '../../API'
import { useNavigate } from 'react-router-dom'

type Props = {
	setUserToken: React.Dispatch<React.SetStateAction<string>>
	user: AccountInt | undefined
}

const Register: React.FC<Props> = ({ setUserToken, user }: Props) => {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [password2, setPassword2] = useState<string>('')
	const [error, setError] = useState<string>('')

	const navigate = useNavigate()

	const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (password !== password2) {
			setError('Passwords do not match')

			return
		}

		if (username.length > 1 && password.length > 1) {
			const { data, error: responseError } = await registerUser(
				username,
				password,
				password2
			)

			if (responseError) {
				setError(responseError)
			} else {
				setUserToken(data.token)
				navigate('/store')
			}
		}
	}

	return (
		<div className='register-main'>
			<h4 className='title'>Register</h4>
			{user === undefined ? (
				<form onSubmit={(e) => submitForm(e)}>
					<div className='register-section'>
						<label htmlFor='username'>Enter your username / email:</label>
						<input
							type='text'
							name='username'
							onChange={(e) => setUsername(e.target.value)}
							value={username}
						/>
					</div>
					<div className='register-section'>
						<label htmlFor='password'>Enter your password:</label>
						<input
							type='password'
							name='password'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</div>
					<div className='register-section'>
						<label htmlFor='password2'>Re-enter your password:</label>
						<input
							type='password'
							name='password2'
							onChange={(e) => setPassword2(e.target.value)}
							value={password2}
						/>
					</div>
					<p className={`error-message ${error ? 'enabled' : ''}`}>{error}</p>
					<button type='submit'>Register</button>
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

export default Register
