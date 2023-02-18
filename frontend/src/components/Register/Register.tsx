import React, { useState } from 'react'
import { registerUser } from '../../API'
import { BeatLoader } from 'react-spinners'
import { motion } from 'framer-motion'

import './styles.css'

type Props = {
	props: {
		setUserToken: React.Dispatch<React.SetStateAction<string>>
		handleClose: () => void
	}
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

const Register: React.FC<Props> = ({ props }: Props) => {
	const { setUserToken, handleClose } = props

	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [password2, setPassword2] = useState<string>('')

	const [error, setError] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

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
			setLoading(false)
		} else {
			setUserToken(data.token)
			setLoading(false)
			handleClose()
		}
	}

	return (
		<motion.div className='register' key='modal'>
			<motion.div onClick={() => handleClose()} className='register__close'>
				X
			</motion.div>
			<motion.div className='register__container'>
				<motion.form onSubmit={(e) => submitForm(e)}>
					<motion.div className='register__container-section'>
						<motion.label htmlFor='username'>
							Enter your username / email:
						</motion.label>
						<motion.input
							type='text'
							name='username'
							onChange={(e) => setUsername(e.target.value)}
							value={username}
						/>
					</motion.div>
					<motion.div className='register__container-section'>
						<motion.label htmlFor='password'>Enter a password:</motion.label>
						<motion.input
							type='password'
							name='password'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</motion.div>
					<motion.div className='register__container-section'>
						<motion.label htmlFor='password2'>
							Re-Enter your password:
						</motion.label>
						<motion.input
							type='password'
							name='password2'
							onChange={(e) => setPassword2(e.target.value)}
							value={password2}
						/>
					</motion.div>
					<motion.p>{error ? `Invalid username or password` : ``}</motion.p>
					{loading ? (
						<BeatLoader color='#574ae2' />
					) : (
						<motion.button type='submit' className='button__1'>
							Register
						</motion.button>
					)}
				</motion.form>
			</motion.div>
		</motion.div>
	)
}

export default Register
