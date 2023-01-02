import { cli } from 'cypress'

describe('Register page', () => {
	beforeEach(() => {
		cy.intercept('/api/store/items', {
			fixture: 'itemFixture.json',
		}).as('Item')

		cy.intercept('/api/accounts/user', {
			fixture: 'userFixture.json',
		}).as('User')
	})

	it('passes', () => {
		cy.visit('/#/register')
	})

	describe('Form contents', () => {
		it('contains the labels', () => {
			cy.visit('/#/register')

			cy.get('label[for=username]')
				.should('be.visible')
				.should('have.text', 'Enter your username / email:')

			cy.get('label[for=password]')
				.should('be.visible')
				.should('have.text', 'Enter your password:')

			cy.get('label[for=password2]')
				.should('be.visible')
				.should('have.text', 'Re-enter your password:')
		})

		it('contains the inputs', () => {
			cy.visit('/#/register')

			cy.get('input[name=username]')
				.should('be.visible')
				.invoke('attr', 'type')
				.should('eq', 'text')

			cy.get('input[name=password]')
				.should('be.visible')
				.invoke('attr', 'type')
				.should('eq', 'password')

			cy.get('input[name=password2]')
				.should('be.visible')
				.invoke('attr', 'type')
				.should('eq', 'password')
		})
	})

	describe('Form function', () => {
		it('has the correct value', () => {
			cy.visit('/#/register')

			cy.get('input[name=username]')
				.clear()
				.type('test')
				.should('have.value', 'test')

			cy.get('input[name=password]')
				.clear()
				.type('test')
				.should('have.value', 'test')

			cy.get('input[name=password2]')
				.clear()
				.type('test')
				.should('have.value', 'test')
		})

		it('submits', () => {
			cy.intercept('/api/accounts/register', {
				fixture: 'registerFixture.json',
			}).as('Register')

			cy.visit('/#/register')

			cy.get('input[name=username]').clear().type('test')
			cy.get('input[name=password]').clear().type('testpassword')
			cy.get('input[name=password2]').clear().type('testpassword')

			cy.get('form button.button').click()

			cy.url().should('include', '/#/store')
			cy.wait('@User')
			cy.get('#nav-main ul#nav-content li#nav-logout a').click()
		})

		it('submits - throws error', () => {
			cy.intercept('/api/accounts/register', {
				statusCode: 400,
				fixture: 'registerFixture.json',
			}).as('Register')

			cy.visit('/#/register')

			cy.get('input[name=username]').clear().type('test')
			cy.get('input[name=password]').clear().type('testpassword')
			cy.get('input[name=password2]').clear().type('testpassword')

			cy.get('form button.button').click()

			cy.get('#register-main form p.error-message.enabled')
				.should('be.visible')
				.contains('Error creating account.')
		})
	})
})
