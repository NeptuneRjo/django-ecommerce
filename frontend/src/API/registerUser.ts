export const registerUser = async (
	username: string,
	password: string,
	password2: string
) => {
	const response: Response = await fetch(
		'http://localhost:8000/api/accounts/register',
		{
			method: 'POST',
			body: JSON.stringify({
				username: username,
				password: password,
				password2: password2,
			}),
		}
	)
	const json = await response.json()

	return json
}
