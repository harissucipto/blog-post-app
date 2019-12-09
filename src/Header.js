import React from "react";
import { useTheme } from "./hooks";

const Header = ({ text }) => {
  const { secondaryColor } = useTheme();

  return <h1 style={{ color: secondaryColor }}>{text}</h1>;
};

export default Header;
