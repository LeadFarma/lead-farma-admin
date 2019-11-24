import { AUTH_LOGIN,  AUTH_LOGOUT, AUTH_ERROR,  AUTH_CHECK } from 'react-admin';
// import { Auth } from "aws-amplify";
import config from "../config/constants";
import axios from "axios";
export default (type, params) => {
    console.log("AUTH PROVIDER")
    const axiosInstance = axios.create({
        baseURL: config.BASE_URL,
        timeout: 3000,
        headers: {'Content-Type': 'application/json'}
        // headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
      });

    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const data = {
            email: username, 
            password: password 
        }

        console.log(data)

        return axiosInstance.post("sessions", data)
        .then(response => {
          if (response.status < 200 || response.status >= 300) {
              throw new Error(response.statusText);
          }
          localStorage.setItem('token', response.data.token);
        }).catch(error => {
          console.log("Erro fazendo login: ", error);
        throw new Error(error.message);

        });
    }
    if (type === AUTH_LOGOUT) {
        // Auth.signOut()
        localStorage.removeItem('token');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        const status  = params.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }
    
    return Promise.resolve();
}


