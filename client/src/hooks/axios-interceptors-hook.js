import { useState, useRef } from "react";
import axios from "axios";

export const useAxiosInterceptors = () => {
    const reqInterceptorRef = useRef(null)
    const resInterceptorRef = useRef(null)
    const [isAuthTokenExpired, setAuthTokenExpired] = useState(false)

    const setupInterceptors = () => {
        console.log('settin up interceptors')
       
        reqInterceptorRef.current = axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            console.log('interceptor req config: ', config)
            return config;
        }, function (error) {
            // Do something with request error
            console.log('interceptor req error: ', error)
            return Promise.reject(error);
        });
    
        // Add a response interceptor
        resInterceptorRef.current = axios.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            console.log('interceptor res success: ', response)
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            console.log('interceptor res error: ', error.response)
            if(error.response.status === 400 && error.response.statusText === 'Bad Request') {
                setTimeout(() => {
                    console.log('logging out')
                    setAuthTokenExpired(true)
                }, 3000);
            }
            return Promise.reject(error);
        });
    }

    const ejectInterceptors = () => {
        console.log('ejecting intercetors')
        setAuthTokenExpired(false)
        axios.interceptors.request.eject(reqInterceptorRef.current);
        axios.interceptors.response.eject(resInterceptorRef.current);
    }

    return [isAuthTokenExpired, setupInterceptors, ejectInterceptors]
}