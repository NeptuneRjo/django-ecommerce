import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { ScrollToTop } from './components'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<>
		<HashRouter>
			<ScrollToTop />
			<App />
		</HashRouter>
	</>
)
