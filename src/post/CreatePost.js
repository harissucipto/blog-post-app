import React, { useState, useEffect } from "react";
import { useNavigation } from "react-navi";
import { useInput } from "react-hookedup";
import useUndo from "use-undo";
import { useDebouncedCallback } from "use-debounce";

import {
  useUserState,
  useDispatch,
  useAPICreatePost,
  useDebouncedUndo
} from "../hooks";

export default function CreatePost() {
  const user = useUserState();
  const dispatch = useDispatch();
  const { value: title, bindToInput: bindTitle } = useInput("");
  const [post, createPost] = useAPICreatePost();
  const navigation = useNavigation();
  const [
    content,
    setContent,
    { undo, redo, canUndo, canRedo }
  ] = useDebouncedUndo();

  useEffect(() => {
    if (post && post.data) {
      dispatch({ type: "CREATE_POST", ...post.data });
      navigation.navigate(`/view/${post.data.id}`);
    }
  }, [dispatch, navigation, post]);

  function handleCreate() {
    createPost({ title, content, author: user });
  }
  function handleContent(e) {
    const { value } = e.target;
    setContent(value);
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
