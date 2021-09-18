import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
    header: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json' },
});

export default instance;