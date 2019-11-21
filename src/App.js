import React, { useReducer, useEffect, useState } from 'react';

import appReducer from './reducers';
import { ThemeContext, StateContext } from './contexts';

import PostList from './post/PostList';
import CreatePost from './post/CreatePost';
import UserBar from './user/UserBar';
import Header from './Header';
import ChangeTheme from './ChangeTheme';

const defaultPosts = [
  {
    id: 'react-hooks',
    title: 'React Hooks',
    content: 'The greatest thing since sliced bread!',
    author: 'Daniel Bugl'
  },
  {
    id: 'react-fragments',
    title: 'Using React Fragments',
    content: 'Keeping the DOM tree clean!',
    author: 'Daniel Bugl'
  }
];

export default function App() {
  const [theme, setTheme] = useState({
    primaryColor: 'deepSkyBlue',
    secondaryColor: 'coral'
  });

  const [state, dispatch] = useReducer(appReducer, {
    user: '',
    posts: defaultPosts
  });

  const { user } = state;

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
