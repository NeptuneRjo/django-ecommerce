import React from 'react'
import './styles.css'

const Footer = () => {
	return (
		<div className='footer'>
			<h3>BargainBay</h3>
			<div className='footer__col'>
				<ul>
					<h4>Contact Us</h4>
					<li>555-555-5555</li>
					<li>8am - 5pm EST M-F</li>
					<li>bargainbay@email.com</li>
					<li>1111 Bargain Road, Suite 300, Bay Harbor, ST 123456</li>
				</ul>
			</div>
			<div className='footer__col'>
				<ul>
					<h4>Navigate</h4>
					<li>
						<a href='#/store'>Store</a>
					</li>
					<li>
						<a href='#/About'>About</a>
					</li>
					<li>
						<a href='#/login'>Log in</a>
					</li>
					<li>
						<a href='#/register'>Create an account</a>
					</li>
				</ul>
			</div>
			<div className='footer__col'>
				<ul>
					<h4>Socials</h4>
					<li>
						<a href='https://facebook.com'>Facebook</a>
					</li>
					<li>
						<a href='https://instagram.com'>Instagram</a>
					</li>
					<li>
						<a href='https://youtube.com'>Youtube</a>
					</li>
					<li>
						<a href='https://twitter.com'>Twitter</a>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Footer
