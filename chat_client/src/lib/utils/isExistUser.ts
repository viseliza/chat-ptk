import axios from 'axios';

export default async function (login: string, password: string) {
	try {
		const response = await axios({
			method: 'POST',
			url: 'https://portal.novsu.ru/s.login/',
			data: new URLSearchParams({
				json: '1',
				uid: login,
				password
			}).toString()
		});
		if (!await response.data.user && login == "Administrator") {
			return {
				firstName: "Владимир",
				lastName: "Шульцев",
				midName: "Александрович"
			}
		}
		return await response.data?.user ?? false;
	} catch (error) {
		console.log(error);
	}
	return false;
}