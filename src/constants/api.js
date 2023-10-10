import axios from 'axios'

const api = axios.create({
//baseURL: 'http://43.228.126.245:5007',
baseURL: 'http://localhost:5007',
});


export default api