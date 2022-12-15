export const getAccount = async (token: string) => {
	const response: Response = await fetch(
		'http://localhost:8000/api/accounts/user',
		{
			method: 'GET',
			headers: {
				Authorization: `Token ${token}`,
			},
			credentials: 'same-origin',
		}
	)

	const json = await response.json()

	if (response.ok) {
		return { data: json, error: undefined }
	} else {
		return { data: undefined, error: 'Invalid Token' }
	}

	return json
}
