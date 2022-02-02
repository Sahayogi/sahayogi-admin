import React, { createContext, useContext ,useReducer} from "react";
const Context = createContext();

const initialState = {
  email: "",
  password: "",
  role: "admin",
  user: null,
  initialLoading: true,
};
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "LOGOUT_USER":
      return { ...state, user: null };

    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const loginUser = (data) => {
    dispatch({ type: "LOGIN_USER", payload: data });
  };

  const logoutUser = (data) => {
    dispatch({ type: "LOGOUT_USER", payload: data });
  };
  return (
    <Context.Provider value={{ data: authState, loginUser, logoutUser }}>
      {children}
    </Context.Provider>
  );
};

//custom hook

const useAuth = () => {
  return useContext(Context);
};

export { Context, Provider, useAuth };
