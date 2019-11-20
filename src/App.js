import React, { useState } from 'react';

import PostList from './post/PostList';
import CreatePost from './post/CreatePost';
import UserBar from './user/UserBar';

const posts = [
  {
    title: 'React Hooks',
    content: 'The greatest thing since sliced bread!',
    author: 'Daniel Bugl'
  },
  {
    title: 'Using React Fragments',
    content: 'Keeping the DOM tree clean!',
    author: 'Daniel Bugl'
  }
];

export default function App() {
  const [user, setUser] = useState('');

  return (
    <div style={{ padding: 8 }}>
      <UserBar user={user} setUser={setUser} />
      <br />
      {user && <CreatePost user={user} />}
      <br />
      <hr />
      <PostList posts={posts} />
    </div>
  );
}
