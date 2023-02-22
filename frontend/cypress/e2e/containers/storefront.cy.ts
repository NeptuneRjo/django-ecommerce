describe('Storefront', () => {
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

		cy.get('.store__grid > .card').should('have.length', 1)
	})

	it('displays the store item', () => {
		cy.visit('/')
		cy.wait('@Items')

		cy.get('.card').should('be.visible')
	})

	it('does not display the message if items', () => {
		cy.visit('/')
		cy.wait('@Items')

		cy.get('.store > .message').should('not.exist')
	})

	it('displays the message if no items', () => {
		cy.intercept('/api/store/items', { body: [] }).as('Noitem')
		cy.visit('/')

		cy.wait('@Noitem')

		cy.get('.store > .message').should('be.visible')
	})
})
