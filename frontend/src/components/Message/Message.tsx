import React from 'react'

import './styles.css'

const Message = () => {
	return (
		<div id='message-container'>
			<p id='message'>You are already signed in.</p>
			<div id='message-buttons'>
				<button className='button'>
					<a href='#/store'>Navigate to the store</a>
				</button>
				<button className='button'>
					<a href='#/cart'>View your cart</a>
				</button>
			</div>
		</div>
	)
}

export default Message
