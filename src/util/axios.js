import axios from 'axios';
import router from 'umi/router';
import {BASE_URL_DEV, BASE_URL_PRO} from './common';

axios.defaults.baseURL = BASE_URL_DEV;
axios.defaults.maxBodyLength=Infinity;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
// //请求拦截器
// axios.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// },(error)=>{
//   // Do something with request error
//   return Promise.reject(error);
// });
// // //响应拦截器
// axios.interceptors.response.use(response=> {
//     return response;
//   },error=> {
//     if(error.response) {
//       const { status } = error.response;
//       //如果401或405则到登录页
//       if (status === 401 || status === 405) {
//         localStorage.removeItem('username');
//         localStorage.removeItem('token');
//         router.push(`/user/login`);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
axios.interceptors.response.use(result => result.data);
export default axios;
