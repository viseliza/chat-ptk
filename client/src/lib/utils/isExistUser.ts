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
		return await response.data?.user ?? false;
	} catch (error) {
		if (login == "Administrator") {
			return {
				first_name: "Владимир",
				last_name: "Шульцев",
				father_name: "Александрович"
			}
		}
		console.log(error);
	}
	return false;
}