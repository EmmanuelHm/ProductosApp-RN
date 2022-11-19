import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Usuario, LoginResponse, LoginData, ResgisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';

import cafeApi from '../api/cafeApi';

type AuthContextProps = {
    errorMessage: string,
    token: string | null,
    user: Usuario | null, 
    status: 'checking' | 'authenticated' | 'not-authenticated',
    signUp: (registerData: ResgisterData) => void,
    signIn: (loginData: LoginData) => void,
    logOut: () => void,
    removeError: () => void,
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer (authReducer, authInitialState)

    useEffect(() => {
        checkToken()
    }, [])


    const checkToken = async () => {

        const token  = await AsyncStorage.getItem('token')

        if( !token ) return dispatch({ type: "notAuthenticated" })

        //hay token 
        const resp = await cafeApi.get('/auth', {
            headers: {
                'x-token': token
            }
        })

        // if(resp.status !== 200){
        //     return dispatch({ type:"notAuthenticated" })
        // } 

        await AsyncStorage.setItem('token', resp.data.token)

        dispatch({
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        })
    }

    const signIn = async ( {correo, password}: LoginData) => {

        try {
            
            const { data } = await cafeApi.post<LoginResponse>('/auth/login', { correo, password } )
            console.log(data);

            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            })

            await AsyncStorage.setItem('token', data.token) 

        } catch(error: any) {
            // console.log(error.response.data.msg)
            dispatch({
                type: "addError",
                payload: error.response.data.errors[0].msg || 'Informacion incorrecta'
            })
        }
    }

    const signUp = async ( { nombre, correo, password} : ResgisterData) => {

        try {
            
            const { data } = await cafeApi.post<LoginResponse>('/usuarios', { nombre, correo, password } )
            console.log(data);

            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            })

            await AsyncStorage.setItem('token', data.token) 

        } catch(error: any) {
            // console.log(error.response.data.msg)
            dispatch({
                type: "addError",
                payload: error.response.data.msg || 'El correo ya esta registrado '
            })
        }
    }

    const logOut = async () => {
        await AsyncStorage.removeItem('token')
        dispatch({ type: "logout" })
    }

    const removeError = () => {
        dispatch({ type: 'removeError' })
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            signUp,
            logOut,
            removeError
        }}>
            { children }
        </AuthContext.Provider>
    )

}