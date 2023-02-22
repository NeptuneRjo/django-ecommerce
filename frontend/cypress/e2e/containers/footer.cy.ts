describe('Footer', () => {
	beforeEach(() => {
		cy.intercept('/api/store/items', {
			fixture: 'itemFixture.json',
		}).as('Items')

		cy.visit('/')
		cy.wait('@Items')
	})

	it('displays the footer', () => {
		cy.get('.footer').should('be.visible')
	})

	it('the navigation links are correct', () => {
		cy.get('[data-test-id="navigate"]').should('be.visible')

		cy.get('[data-test-id="navigate"] > li > a')
			.contains('Store')
			.should('have.attr', 'href')
			.should('contain', '#/store')

		cy.get('[data-test-id="navigate"] > li > a')
			.contains('About')
			.should('have.attr', 'href')
			.should('contain', '#/about')
	})
})
