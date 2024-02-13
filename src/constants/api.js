import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
// // Define the base URL(s) conditionally
// let baseURL;

// if (process.env.NODE_ENV === 'production') {
//   baseURL = process.env.PRODUCTION_URL;
// } else {
//   baseURL = process.env.TEST_URL;
// }

// console.log('NODE_ENV:', process.env.NODE_ENV);
// const api = axios.create({
//   baseURL, // Use the baseURL variable here
// });

const api = axios.create({
    baseURL: 'http://43.228.126.245:5007',
    //baseURL: 'http://localhost:5007',
    
    
    });
    
export default api;




