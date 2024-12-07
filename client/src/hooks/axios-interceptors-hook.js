import { useState, useRef } from "react";
import axios from 'axios' 

export const useAxiosInterceptors = () => {
    const reqInterceptorRef = useRef(null)
    const resInterceptorRef = useRef(null)
    const [isRefreshTokenExpired, setRefreshTokenExpired] = useState(false)

    const setupInterceptors = () => {
        // console.log('settin up interceptors')
       
        reqInterceptorRef.current = axios.interceptors.request.use(function (config) {

            console.log('interceptor req config: ', config)
            return config;
        }, function (error) {

            console.log('interceptor req error: ', error)
            return Promise.reject(error);
        });
    

        resInterceptorRef.current = axios.interceptors.response.use(function (response) {

            console.log('interceptor res success: ', response)

            return response;
        }, async function (error) {

            console.log('interceptor res error: ', error)
            if(error.response.data.status === 400 && 
                (error.response.data.message === 'ACCESS_TOKEN_EXPIRED' || 
                    error.response.data.message === 'NO_ACCESS_TOKEN')) 
            {
                    console.log(1)
                    console.log('verify refresh token')

                    try {
                            const res = await axios.post('/api/auth/refresh-token')
                            console.log('rft res: ', res)
                            console.log('call pending request here')
                            return axios(error.config)
                        } catch (error) {
                            console.log('refresh token error: ', error)
                        }

            }
            if(error.response.data.status === 400 && 
                (error.response.data.message === 'REFESH_TOKEN_EXPIRED' || 
                    error.response.data.message === 'NO_REFESH_TOKEN')) 
            {
                
                    console.log(2)
                    console.log('set refresh token expired and log out')
                    setRefreshTokenExpired(true)
            }
            return Promise.reject(error);
        });
    }

    const ejectInterceptors = () => {
        // console.log('ejecting intercetors')
        setRefreshTokenExpired(false)
        axios.interceptors.request.eject(reqInterceptorRef.current);
        axios.interceptors.response.eject(resInterceptorRef.current);
    }

    return [isRefreshTokenExpired, setupInterceptors, ejectInterceptors]
}