import { StoreItemInt } from '../types'

export const addToCart = async (token: string, item: StoreItemInt) => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/accounts/add-to-cart`,
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
		return { data: undefined, error: json }
	}
}
