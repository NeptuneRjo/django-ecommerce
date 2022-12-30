import { cli } from 'cypress'

describe('Storefront - main', () => {
	beforeEach(() => {
		cy.intercept('/api/store/items', {
			fixture: 'itemFixture.json',
		}).as('Items')
	})

	it('passes', () => {
		cy.visit('/')
		cy.wait('@Items')
	})

	it('uses the correct url (default)', () => {
		cy.visit('/')
		cy.wait('@Items')

		cy.url().should('include', '/#/store')
	})

	it('has the single store item', () => {
		cy.visit('/')
		cy.wait('@Items')

		cy.get('#store-grid > #grid-item').should('have.length', 1)
	})

	it('displays the store item correctly', () => {
		cy.visit('/')
		cy.wait('@Items')

		cy.get('#grid-item > #storeitem-main').should('be.visible')
		cy.get('#storeitem-image > img').should('be.visible')

		cy.get('#storeitem-info > #name-mobile').should('be.visible')
		cy.get('#storeitem-info > #price').should('be.visible')
		cy.get('#storeitem-info > #name-desktop').should('not.be.visible')

		cy.get('#store-grid > #grid-item > .button').should('be.visible')
	})

	it('does not display the message if items', () => {
		cy.visit('/')
		cy.wait('@Items')

		cy.get('#store-main > .message-container').should('not.exist')
	})

	it('displays the message if no items', () => {
		cy.intercept('/api/store/items')
		cy.visit('/')

		cy.get('#store-main > .message-container').should('be.visible')
	})
})
