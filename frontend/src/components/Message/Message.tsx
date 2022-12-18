import React from 'react'

import './styles.css'

const Message = () => {
	return (
		<div className='message-container'>
			<p className='message'>You are already signed in.</p>
			<div className='message-buttons'>
				<button className='button'>
					<a href='#/store'>Navigate to the store front</a>
				</button>
				<button className='button'>
					<a href='#/cart'>View your cart</a>
				</button>
			</div>
		</div>
	)
}

export default Message
