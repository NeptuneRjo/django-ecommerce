import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Sets the view to the top of the page. */

const ScrollToTop = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return null
}

export default ScrollToTop
