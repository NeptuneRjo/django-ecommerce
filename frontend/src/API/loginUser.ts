export const loginUser = async (username: string, password: string) => {
	const response: Response = await fetch(
		'http://localhost:8000/api/accounts/login',
		{
			method: 'POST',
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		}
	)
	const json = await response.json()

	return json
}
