import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/account',
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});
export default axiosInstance