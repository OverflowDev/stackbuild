import { createContext, useReducer, useContext } from "react"

import AuthReducer from './AuthReducer'
import axiosPrivate from "../api/Axios"

const AuthContext = createContext()

const APP_ID = import.meta.env.VITE_APP_ID

const AuthProvider = ({children}) => {

    const initialState = {
        user: JSON.parse(localStorage.getItem('user')) || null,
        error: null,
        loading: false
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const registerUser = async (formData) => {

        dispatch({ type: 'SET_LOADING', payload: true });

        try {
            const response = await axiosPrivate.post(
                '/user/create', 
                    formData,
                {
                    headers: {
                        'app-id': APP_ID
                    }
                }
            )

            const userData = response.data

            dispatch({
                type: 'REGISTER_SUCCESS',
                // payload: response
                payload: userData
            })

            dispatch({ type: 'SET_LOADING', payload: false });

        } catch (error) {
            // console.error('Error response:', error.response.data.data.email);
            dispatch({
                type: 'AUTH_ERROR',
                // payload: error.response.data,
                payload: error.response.data.data.email,
            });

            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }

    const logoutUser = () => {
        dispatch({ type: 'LOGOUT' });
    };

    // const clearError = () => {
    //     dispatch({ type: 'CLEAR_ERROR' });
    // };


    return <AuthContext.Provider value={{ 
        ...state,
        registerUser,
        logoutUser,
     }}>
        {children}
    </AuthContext.Provider>

}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  }


export {AuthProvider, useAuth}