import { StoreItemInt } from '../types'

export const updateCart = async (
	token: string,
	toAdd: StoreItemInt[] = [],
	toRemove: StoreItemInt[] = []
) => {
	const response: Response = await fetch(
		'http://localhost:8000/api/accounts/user',
		{
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify({
				to_add: toAdd,
				to_remove: toRemove,
			}),
		}
	)
	const json = await response.json()

	if (!response.ok) {
		return {
			data: undefined,
			errors: {
				to_add: json?.to_add_error,
				to_remove: json?.to_remove_error,
			},
		}
	} else {
		return { data: json, errors: undefined }
	}

	return json
}
