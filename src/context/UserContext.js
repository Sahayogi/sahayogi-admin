import React, { createContext, useContext } from "react";
const Context = createContext();

const initialState = {
  email: "",
  password: "",
  role: "aidagency",
  // type: "",
  initialLoading: true,
};

const Provider = ({ children }) => {
  return (
    <Context.Provider value={{ data: initialState }}>
      {children}
    </Context.Provider>
  );
};

//custom hook

const useAuth = () => {
  return useContext(Context);
};

export { Context, Provider, useAuth };
