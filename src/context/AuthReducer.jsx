const AuthReducer = (state, action) => {

    // Register Success 
    if(action.type === 'REGISTER_SUCCESS') {
        localStorage.setItem('user', JSON.stringify(action.payload));
        return {
            ...state,
            user: action.payload,
            error: null
        }
    }

    // Auth Error 
    if(action.type === 'AUTH_ERROR') {
        return {
            ...state,
            error: action.payload,
        }
    }

    // Loading
    if(action.type === 'SET_LOADING') {
        return {
            ...state,
            loading: action.payload,
        };
    }

    // Logout
    if(action.type === 'LOGOUT') {
        localStorage.removeItem('user');
        return {
            ...state,
            user: null,
        }
    }

    return state


}

export default AuthReducer