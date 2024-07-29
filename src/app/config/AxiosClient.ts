import axios from "axios";

const axiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	timeout: 10000
});

axiosClient.interceptors.request.use(
	(request) => {
		try {
			const token = sessionStorage.getItem('token');
			if (token) {
				request.headers['x-token'] = token;
			}
		} catch (e) { }

		return request;
	},
	(error) => {
		return Promise.reject(new Error(error));
	}
);

export default axiosClient;

