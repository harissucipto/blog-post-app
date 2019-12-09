import React, { useState, useContext, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import { useNavigation } from 'react-navi';
import { useInput } from 'react-hookedup';
import useUndo from 'use-undo';
import { useDebouncedCallback } from 'use-debounce';

import { StateContext } from '../contexts';

export default function CreatePost() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const { value: title, bindToInput: bindTitle } = useInput('');
  const [
    undoContent,
    { set: setContent, undo, redo, canUndo, canRedo }
  ] = useUndo('');

  const [post, createPost] = useResource(({ title, content, author }) => ({
    url: '/posts',
    method: 'post',
    data: { title, content, author }
  }));

  const navigation = useNavigation();

  // debounce
  const [content, setInput] = useState('');
  const [setDebounce, cancelDebounce] = useDebouncedCallback(
    value => setContent(value),
    200
  );

  // trigger saat undoContent berubah
  useEffect(() => {
    cancelDebounce();
    setInput(undoContent.present);
  }, [cancelDebounce, undoContent]);

  useEffect(() => {
    if (post && post.data) {
      dispatch({ type: 'CREATE_POST', ...post.data });
      navigation.navigate(`/view/${post.data.id}`);
    }
  }, [dispatch, navigation, post]);

  function handleCreate() {
    createPost({ title, content, author: user });
  }

  function handleContent(e) {
    const { value } = e.target;
    setInput(value);
    setDebounce(value);
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <div>
        Author: <b>{user}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          value={title}
          {...bindTitle}
          name="create-title"
          id="create-title"
        />
      </div>
      <textarea value={content} onChange={handleContent} />
      <button type="button" onClick={undo} disabled={!canUndo}>
        Undo
      </button>
      <button type="button" onClick={redo} disabled={!canRedo}>
        Redo
      </button>
      <input type="submit" value="Create" />
    </form>
  );
}
