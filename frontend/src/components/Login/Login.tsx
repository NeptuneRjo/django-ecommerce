import React, { useState } from 'react'
import { loginUser } from '../../API'
import { BeatLoader } from 'react-spinners'
import { motion } from 'framer-motion'

import './styles.css'

type Props = {
	props: {
		setUserToken: React.Dispatch<React.SetStateAction<string>>
		handleClose: () => void
	}
}

const Login: React.FC<Props> = ({ props }: Props) => {
	const { setUserToken, handleClose } = props

	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

		if (username.length >= 1 && password.length >= 1) {
			const { data, error: errorMessage } = await loginUser(username, password)

			if (errorMessage) {
				setError(errorMessage)
				setLoading(false)
			} else {
				handleClose()
				setUserToken(data.token)

				setUsername('')
				setPassword('')

				setLoading(false)
			}
		}
	}

	return (
		<motion.div className='login' key='modal'>
			<motion.div onClick={() => handleClose()} className='login__close'>
				X
			</motion.div>
			<motion.div className='login__container'>
				<motion.form onSubmit={(e) => submitLogin(e)}>
					<motion.div className='login__container-section'>
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
					<motion.div className='login__container-section'>
						<motion.label htmlFor='password'>Enter your password:</motion.label>
						<motion.input
							type='password'
							name='password'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</motion.div>
					<motion.p>{error ? `Invalid username or password` : ``}</motion.p>
					{loading ? (
						<BeatLoader color='#574ae2' />
					) : (
						<motion.button type='submit' className='button__1'>
							Sign in
						</motion.button>
					)}
				</motion.form>
			</motion.div>
		</motion.div>
	)
}

export default Login
