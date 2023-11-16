import axiosClient from './axiosClient';

const UserAPI = {
	postSignin: (user) => {
		const url = '/user/signin';
		return axiosClient.post(url,{user:user},{
			headers: {
				'Content-Type': 'application/json'
			}});
	},

	getDetailData: (id) => {
		const url = `/users/${id}`;
		return axiosClient.get(url);
	},
	postSignout: (id) => {
		const url = `/user/signout`;
		return axiosClient.post(url);
	},

	postSignUp: (user) => {
		const url = `/user/signup`;
		return axiosClient.post(url,{user:user},{
			headers: {
				'Content-Type': 'application/json'
			}});
	},
};

export default UserAPI;
