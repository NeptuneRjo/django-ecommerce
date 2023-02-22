import { describe, expect, test } from '@jest/globals'
import {
	getItems,
	getAccount,
	loginUser,
	registerUser,
	addToCart,
	removeFromCart,
} from '../API'

const unmockedFetch = global.fetch

const mockFetch = async (response: boolean, data: object | []) => {
	global.fetch = jest
		.fn()
		.mockImplementation(
			jest.fn(() =>
				Promise.resolve({ ok: response, json: () => Promise.resolve(data) })
			) as jest.Mock
		)
}

const MOCK_ITEM = {
	item_category: 'category',
	item_description: 'test description',
	item_image_url: 'https://example.com',
	item_price: '9.99',
	item_rating: '4.5',
	item_count: '145',
	item_title: 'test title',
}

const MOCK_ACCOUNT = {
	account: {
		user: {
			username: 'foo',
		},
		account_cart: [MOCK_ITEM],
	},
}

const MOCK_LOGIN = {
	username: 'test',
	password: 'testpassword',
}

const MOCK_REGISTER = {
	username: 'test',
	password: 'testpassword',
	password2: 'testpassword',
}

const MOCK_REGISTER_CONF = {
	username: ['A user with that username already exists.'],
}

const MOCK_CART_ERRORS = {
	to_add: 'Error',
	to_remove: 'Error',
}

describe('API', () => {
	afterAll(() => {
		global.fetch = unmockedFetch
	})

	describe('getItems', () => {
		test('returns the items', async () => {
			mockFetch(true, [MOCK_ITEM])

			const response = await getItems()
			expect(response).toEqual([MOCK_ITEM])
		})
	})

	describe('getAccount', () => {
		test('returns the account', async () => {
			mockFetch(true, MOCK_ACCOUNT)

			const response = await getAccount('token')
			expect(response).toEqual({ data: MOCK_ACCOUNT })
		})

		test('returns the error', async () => {
			mockFetch(false, MOCK_ACCOUNT)

			const response = await getAccount('token')
			expect(response).toEqual({ error: 'Invalid Token' })
		})
	})

	describe('loginUser', () => {
		test('returns the logged in accound', async () => {
			const { username, password } = MOCK_LOGIN

			mockFetch(true, MOCK_ACCOUNT)

			const response = await loginUser(username, password)
			expect(response).toEqual({ data: MOCK_ACCOUNT })
		})

		test('returns the error', async () => {
			const { username, password } = MOCK_LOGIN
			const error = 'Unable to log in with provided credentials.'

			mockFetch(false, MOCK_ACCOUNT)

			const response = await loginUser(username, password)
			expect(response).toEqual({ error: error })
		})
	})

	describe('registerUser', () => {
		test('returns the registered account', async () => {
			const { username, password, password2 } = MOCK_REGISTER

			mockFetch(true, MOCK_REGISTER)

			const response = await registerUser(username, password, password2)
			expect(response).toEqual({ data: MOCK_REGISTER })
		})

		test('returns the username conflict', async () => {
			const { username, password, password2 } = MOCK_REGISTER
			const error = 'A user with that username already exists.'

			mockFetch(true, MOCK_REGISTER_CONF)

			const response = await registerUser(username, password, password2)
			expect(response).toEqual({ error: error })
		})

		test('returns the error', async () => {
			const { username, password, password2 } = MOCK_REGISTER
			const error = 'Error creating account.'

			mockFetch(false, MOCK_REGISTER)

			const response = await registerUser(username, password, password2)
			expect(response).toEqual({ error: error })
		})
	})

	describe('addToCart', () => {
		it('returns the updated cart', async () => {
			mockFetch(true, MOCK_ACCOUNT)

			const response = await addToCart('token', MOCK_ITEM)
			expect(response).toEqual({ data: MOCK_ACCOUNT })
		})

		it('returns an error', async () => {
			mockFetch(false, { error: 'No item found' })

			const response = await addToCart('token', MOCK_ITEM)
			expect(response).toEqual({ error: { error: 'No item found' } })
		})
	})

	describe('removeFromCart', () => {
		it('returns the updated cart', async () => {
			mockFetch(true, MOCK_ACCOUNT)

			const response = await removeFromCart('token', MOCK_ITEM)
			expect(response).toEqual({ data: MOCK_ACCOUNT })
		})

		it('returns an error', async () => {
			mockFetch(false, { error: 'No item found' })

			const response = await removeFromCart('token', MOCK_ITEM)
			expect(response).toEqual({ error: { error: 'No item found' } })
		})
	})
})
