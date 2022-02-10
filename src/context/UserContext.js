import React, { createContext, useContext, useReducer } from "react";
const Context = createContext();

const initialState = {
  email: "",
  user: null,
  type: "",
  role: "admin",
  initialLoading: true,
};
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return { ...state, user: action.payload };
    case "LOGOUT_USER":
      return { ...state, user: null };

    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const loadUser = (data) => {
    dispatch({ type: "LOAD_USER", payload: data });
    localStorage.setItem("access-token", data.token);
    localStorage.setItem("userLoggedIn", JSON.stringify(data));
  };

  const logoutUser = (data) => {
    localStorage.setItem("userLoggedIn", null);
    dispatch({ type: "LOGOUT_USER", payload: data });
  };
  return (
    <Context.Provider value={{ data: authState, loadUser, logoutUser, }}>
      {children}
    </Context.Provider>
  );
};

//custom hook

const useAuth = () => {
  return useContext(Context);
};

export { Context, Provider, useAuth };
