// Theme Context Wrappeer
import React, { useReducer } from "react";
import { ThemeContext, StateContext } from "../contexts";
import appReducer from "../reducers";

export function ThemeContextWrapper({ children }) {
  return (
    <ThemeContext.Provider
      value={{ primaryColor: "deepskyblue", secondaryColor: "coral" }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function StateContextWrapper({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: [],
    error: ""
  });

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}
