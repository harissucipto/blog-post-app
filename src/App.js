import React, { useReducer, useEffect, useState } from "react";
import { mount, route } from "navi";
import { Router, View } from "react-navi";

import appReducer from "./reducers";
import { ThemeContext, StateContext } from "./contexts";
import HeaderBar from "./pages/HeaderBar";
import FooterBar from "./pages/FooterBar";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

const routes = mount({
  "/": route({ view: <HomePage /> }),
  "/view/:id": route(req => {
    return { view: <PostPage id={req.params.id} /> };
  })
});

export default function App() {
  const [theme, setTheme] = useState({
    primaryColor: "deepSkyBlue",
    secondaryColor: "coral"
  });

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: [],
    error: ""
  });

  const { user } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user} - React Hooks Blog`;
    } else {
      document.title = "React Hooks Blog";
    }
  }, [user]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>
        <Router routes={routes}>
          <div style={{ padding: 8 }}>
            <HeaderBar setTheme={setTheme} />
            <hr />
            <View />
            <FooterBar />
          </div>
        </Router>
      </ThemeContext.Provider>
    </StateContext.Provider>
  );
}
