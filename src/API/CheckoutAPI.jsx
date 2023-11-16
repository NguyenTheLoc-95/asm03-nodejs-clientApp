import axiosClient from './axiosClient';

const CheckoutAPI = {
	postEmail: (user) => {
		const url = `/create-order`;
		return axiosClient.post(url, {user:user},{
			headers: {
				'Content-Type': 'application/json'
			}});
	},
};

export default CheckoutAPI;
