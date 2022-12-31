import { cli } from 'cypress'

describe('Login page', () => {
	beforeEach(() => {
		cy.intercept('/api/accounts/user', {
			fixture: 'userFixture.json',
		}).as('User')

		cy.intercept('/api/store/items', {
			fixture: 'itemFixture.json',
		})
	})

	it('passes', () => {
		cy.visit('/#/login')
	})

	describe('Form contents', () => {
		it('contains the labels', () => {
			cy.visit('/#/login')

			cy.get('label[for=username]').should('be.visible')
			cy.get('label[for=username]').should(
				'have.text',
				'Enter your username / email:'
			)

			cy.get('label[for=password]').should('be.visible')
			cy.get('label[for=password]').should('have.text', 'Enter your password:')
		})

		it('contains the inputs', () => {
			cy.visit('/#/login')

			cy.get('input[name=username]').should('be.visible')
			cy.get('input[name=username]').invoke('attr', 'type').should('eq', 'text')

			cy.get('input[name=password]').should('be.visible')
			cy.get('input[name=password]')
				.invoke('attr', 'type')
				.should('eq', 'password')
		})
	})

	describe('Form function', () => {
		it('has the correct value', () => {
			cy.visit('/#/login')

			cy.get('input[name=username]')
				.clear()
				.type('test')
				.should('have.value', 'test')

			cy.get('input[name=password]')
				.clear()
				.type('test')
				.should('have.value', 'test')
		})

		it('submits', () => {
			cy.intercept('/api/accounts/login', {
				fixture: 'tokenFixture.json',
			}).as('Token')

			cy.visit('/#/login')

			cy.get('input[name=username]').clear().type('test')
			cy.get('input[name=password]').clear().type('test')

			cy.get('form button.button').click()

			cy.url().should('include', '/#/store')

			cy.wait('@User')
			cy.get('#nav-main ul#nav-content li#nav-logout a').click()
		})

		it('submits - throws error', () => {
			cy.intercept('/api/accounts/login', {
				fixture: 'tokenFixture.json',
				statusCode: 400,
			}).as('TokenError')

			cy.visit('/#/login')

			cy.get('input[name=username]').clear().type('test')
			cy.get('input[name=password]').clear().type('test')

			cy.get('form button.button').click()

			cy.url().should('include', '/#/login')
			cy.get('#login-main form p.error-message.enabled')
				.should('be.visible')
				.contains('Unable to log in with provided credentials.')
		})
	})
})
