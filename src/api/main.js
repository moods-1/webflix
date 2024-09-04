import axios from 'axios';

export const mainRequest = async (method, url, data) => {
	try {
		const response = await axios({ method, url, data });
		return response.data;
	} catch (error) {
		if (error.response) {
			const { status } = error.response;
			if (status === 401) {
				handleLogout();
			}
			return error.response.data;
		}
	}
};
