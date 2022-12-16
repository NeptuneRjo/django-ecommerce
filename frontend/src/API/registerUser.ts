export const registerUser = async (
	username: string,
	password: string,
	password2: string
) => {
	const response: Response = await fetch(
		'http://localhost:8000/api/accounts/register',
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password,
				password2: password2,
			}),
		}
	)
	const json = await response.json()

	const userConflict = 'A user with that username already exists.'

	if (response.ok) {
		if (json?.username[0] === userConflict) {
			return {
				data: undefined,
				error: userConflict,
			}
		} else {
			return { data: json, error: undefined }
		}
	} else {
		return { data: undefined, error: 'Error creating account.' }
	}
}
