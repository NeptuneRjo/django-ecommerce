export const loginUser = async (username: string, password: string) => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/accounts/login`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		}
	)
	const json = await response.json()

	if (response.ok) {
		return { data: json, error: undefined }
	} else {
		return {
			data: undefined,
			error: 'Unable to log in with provided credentials.',
		}
	}
}
