import { StoreItemInt } from '../types'

export const removeFromCart = async (token: string, item: StoreItemInt) => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/accounts/remove-from-cart`,
		{
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			credentials: 'same-origin',
			body: JSON.stringify({ item }),
		}
	)
	const json = await response.json()

	if (response.ok) {
		return { data: json, error: undefined }
	} else {
		return { data: undefined, error: json.error }
	}
}
