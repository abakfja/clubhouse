import axios from "axios";

const baseurl = "http://localhost:8080/api";

const fetcher = (url) => axios.get(`${baseurl}${url}`).then((res) => res.data);

export const sendData = (url, body) =>
	axios.post(`${baseurl}${url}`, body).then((res) => res.data);

export default fetcher;
