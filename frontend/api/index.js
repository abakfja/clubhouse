import axios from "axios";

const baseurl = "http://localhost:8000/api";

const fetcher = (url) => axios.get(`${baseurl}${url}`).then((res) => res.data);

export const sendData = (url, body) =>
	axios.post(`${baseurl}${url}`, body).then((res) => res.data);

export const setHeaders = (token) => {
	axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
	console.log(axios.defaults.headers);
};

export default fetcher;
