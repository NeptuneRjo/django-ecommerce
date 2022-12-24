import React, { useState } from 'react'
import { AccountInt } from '../../types'
import { registerUser } from '../../API'
import { useNavigate } from 'react-router-dom'
import { Message } from '../../components'

import './styles.css'

type Props = {
	setUserToken: React.Dispatch<React.SetStateAction<string>>
	user: AccountInt | undefined
}

export const validatePasswords = (
	password1: string,
	password2: string
): boolean => {
	if (password1 !== password2) {
		return false
	}

	return true
}

export const validateInputs = (username: string, password: string): boolean => {
	if (username.length < 3) {
		return false
	} else if (password.length < 6) {
		return false
	}

	return true
}

const Register: React.FC<Props> = ({ setUserToken, user }: Props) => {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [password2, setPassword2] = useState<string>('')
	const [error, setError] = useState<string>('')

	const navigate = useNavigate()

	const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const passAreValid = validatePasswords(password, password2)
		if (!passAreValid) {
			setError('Passwords do not match')
			return
		}

		const inputsAreValid = validateInputs(username, password)
		if (!inputsAreValid) {
			setError('Username or password are invalid')
			return
		}

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

	return (
		<div id='register-main'>
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
					<button className='button' type='submit'>
						Register
					</button>
				</form>
			) : (
				<Message />
			)}
		</div>
	)
}

export default Register
