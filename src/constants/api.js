import axios from 'axios';

// Define the base URL(s) conditionally
let baseURL;

if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://43.228.126.245:5007';
} else {
  baseURL = 'http://43.228.126.245:4017';
}

console.log('NODE_ENV:', process.env.NODE_ENV);
const api = axios.create({
  baseURL, // Use the baseURL variable here
});


export default api;




