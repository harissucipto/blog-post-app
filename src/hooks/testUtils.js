// Theme Context Wrappeer
import React from "react";
import { ThemeContext } from "../contexts";

export function ThemeContextWrapper({ children }) {
  return (
    <ThemeContext.Provider
      value={{ primaryColor: "deepskyblue", secondaryColor: "coral" }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
