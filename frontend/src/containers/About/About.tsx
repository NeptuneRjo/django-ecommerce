import React from 'react'
import './styles.css'

const About = () => {
	return (
		<div className='about'>
			<div className='about__section'>
				<h1>A web store for all your needs</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
					odit officiis minima ipsum quis voluptatem nulla et perferendis fuga
					delectus nemo, neque ipsa nesciunt voluptatibus veritatis tempora esse
					maiores eius.
				</p>
			</div>
			<div className='about__banner bg-dark'>
				<div className='about__banner__row'>
					<h3>Reliable</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt,
						quaerat nulla.
					</p>
				</div>
				<div className='about__banner__row'>
					<h3>Fast</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
				</div>
				<div className='about__banner__row'>
					<h3>Cheap</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
						accusantium id asperiores quaerat eaque
					</p>
				</div>
			</div>
			<div className='about__section'>
				<h2>Some more about our very special web store</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat.
				</p>
				<p>
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
					dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est
					laborum.
				</p>
			</div>
		</div>
	)
}

export default About
