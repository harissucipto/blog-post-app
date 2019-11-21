import React, { useReducer, useEffect, useState } from 'react';

import appReducer from './reducers';
import { ThemeContext, StateContext } from './contexts';

import PostList from './post/PostList';
import CreatePost from './post/CreatePost';
import UserBar from './user/UserBar';
import Header from './Header';
import ChangeTheme from './ChangeTheme';

export default function App() {
  const [theme, setTheme] = useState({
    primaryColor: 'deepSkyBlue',
    secondaryColor: 'coral'
  });

  const [state, dispatch] = useReducer(appReducer, {
    user: '',
    posts: []
  });

  const { user } = state;

  useEffect(() => {
    fetch('/api/posts')
      .then(result => result.json())
      .then(posts => dispatch({ type: 'FETCH_POSTS', posts }));
  }, []);

  useEffect(() => {
    if (user) {
      document.title = `${user} - React Hooks Blog`;
    } else {
      document.title = 'React Hooks Blog';
    }
  }, [user]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>
        <div style={{ padding: 8 }}>
          <Header text="React Hooks Blog" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <br />
          <UserBar />
          <br />
          {user && <CreatePost />}
          <br />
          <hr />
          <PostList />
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  );
}
