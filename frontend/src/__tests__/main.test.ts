import { describe, expect, test } from '@jest/globals'
import { isItemInCart } from '../containers/Storefront/Storefront'
import {
	validatePasswords,
	validateInputs,
} from '../components/Register/Register'

const MOCK_ITEM = {
	item_category: 'category',
	item_description: 'test description',
	item_image_url: 'https://example.com',
	item_price: '9.99',
	item_rating: '4.5',
	item_count: '145',
	item_title: 'test title',
}

const MOCK_CART = [MOCK_ITEM]

describe('Containers', () => {
	describe('Storefront', () => {
		test('isItemInCart returns if item is in cart', () => {
			const responseTrue = isItemInCart(MOCK_ITEM, MOCK_CART)
			const responseFalse = isItemInCart(MOCK_ITEM, [])

			expect(responseTrue).toEqual(true)
			expect(responseFalse).toEqual(false)
		})
	})

	describe('Register', () => {
		test('validatePasswords - true if passwords match', () => {
			const response = validatePasswords('pass', 'pass')

			expect(response).toEqual(true)
		})

		test('validatePasswords - false if passwords dont match', () => {
			const response = validatePasswords('pass1', 'pass')

			expect(response).toEqual(false)
		})

		test('validateInputs - true if criteria met', () => {
			const response = validateInputs('username', 'password')

			expect(response).toEqual(true)
		})

		test('validateInputs - false if username bad', () => {
			const response = validateInputs('us', 'password')

			expect(response).toEqual(false)
		})

		test('validateInputs - false if password bad', () => {
			const response = validateInputs('username', 'pass')

			expect(response).toEqual(false)
		})
	})
})
