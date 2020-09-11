import axios from 'axios';

export const IP = '192.168.0.27'

export default axios.create({
    baseURL: `http://${IP}:8000/api/`,
});
