import { cli } from 'cypress'

const loginUser = (fixture: string) => {
	cy.intercept('/api/accounts/user', {
		fixture: fixture,
	}).as('User')

	cy.visit('/#/login')

	cy.get('input[name=username]').clear().type('test')
	cy.get('input[name=password]').clear().type('test')

	cy.get('form button.button').click()
}

describe('Cart page', () => {
	beforeEach(() => {
		cy.intercept('/api/accounts/login', {
			fixture: 'tokenFixture.json',
		}).as('Token')

		cy.intercept('/api/store/items', {
			fixture: 'itemFixture.json',
		})
	})

	describe('Cart content', () => {
		it('shows the message', () => {
			loginUser('userFixtureTwo.json')

			cy.get('#nav-main #nav-content #nav-cart a svg').click()

			cy.get('#cart-main > .cart-message > p.message')
				.should('be.visible')
				.contains('No items in your cart right now.')

			cy.get('#nav-main ul#nav-content li#nav-logout a').click()
		})

		it('shows item in the cart', () => {
			loginUser('userFixture.json')

			cy.get('#nav-main #nav-content #nav-cart a svg').click()

			cy.url().should('include', '/#/cart')

			cy.get('#cart-grid > #grid-item').should('have.length', 1)

			cy.get('#nav-main ul#nav-content li#nav-logout a').click()
		})

		it('displays the cart item correctly', () => {
			loginUser('userFixture.json')

			cy.get('#nav-main #nav-content #nav-cart a svg').click()

			cy.url().should('include', '/#/cart')

			cy.get('#grid-item > #storeitem-main').should('be.visible')
			cy.get('#storeitem-image > img').should('be.visible')

			cy.get('#storeitem-info > #name-mobile').should('be.visible')
			cy.get('#storeitem-info > #price').should('be.visible')
			cy.get('#storeitem-info > #name-desktop').should('not.be.visible')

			cy.get('#cart-grid > #grid-item > .button').should('be.visible')

			cy.get('#nav-main ul#nav-content li#nav-logout a').click()
		})
	})

	describe('Cart functionality', () => {
		beforeEach(() => {
			loginUser('userFixture.json')
		})

		it('marks for removal', () => {
			cy.get('#nav-main #nav-content #nav-cart a svg').click()

			cy.url().should('include', '/#/cart')

			cy.get('#cart-grid > #grid-item > button.button')
				.contains('Mark for removal')
				.click()

			cy.get('#cart-grid > #grid-item > button.button').contains('Undo').click()

			cy.get('#nav-main ul#nav-content li#nav-logout a').click()
		})

		it('removes the item', () => {
			cy.intercept('PATCH', '/api/accounts/user', {
				fixture: 'userFixtureTwo.json',
			}).as('NewUser')

			cy.get('#nav-main #nav-content #nav-cart a svg').click()

			cy.url().should('include', '/#/cart')

			cy.get('#cart-grid > #grid-item > button.button').click()

			cy.get('#cart-controls > button').click()
			cy.wait('@NewUser')

			cy.get('#cart-grid > #grid-item').should('have.length', 0)

			cy.get('#nav-main ul#nav-content li#nav-logout a').click()
		})
	})
})
