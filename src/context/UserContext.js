import React, { createContext, useContext, useReducer } from 'react';
const Context = createContext();

const initialState = {
  user: {},
  initialLoading: true,
  loggingIn: false,
  loginInSucess: false,
  loginError: null,
};
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT_USER':
      return { ...state, user: null };
    case 'LOGIN':
      return { ...state, loggingIn: true, loginInSucess: false };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loggingIn: true,
        loginInSucess: true,
        user: action.payload,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        loggingIn: false,
        loginInSucess: false,
        loginError: action.payload,
      };

    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const loadUser = (data) => {
    dispatch({ type: 'LOAD_USER', payload: data });
    // console.log('data', data);
    localStorage.setItem('userLoggedIn', JSON.stringify(data));
    localStorage.setItem('email', data.email);
    localStorage.setItem('access-token', data.token);
  };

  const logoutUser = (data) => {
    localStorage.setItem('userLoggedIn', null);
    localStorage.removeItem('access-token');

    dispatch({ type: 'LOGOUT_USER', payload: data });
  };
  const login = (data) => {
    dispatch({ type: 'LOGIN', payload: data });
  };

  const loginSuccess = (data) => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
  };
  const loginError = (data) => {
    dispatch({ type: 'LOGIN_ERROR', payload: data });
  };
  return (
    <Context.Provider
      value={{
        data: authState,
        loadUser,
        logoutUser,
        login,
        loginSuccess,
        loginError,
      }}
    >
      {children}
    </Context.Provider>
  );
};

//custom hook

const useAuth = () => {
  return useContext(Context);
};

export { Context, Provider, useAuth };
