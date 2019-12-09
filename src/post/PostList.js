import React from "react";

import Post from "./Post";
import { usePostsState } from "../hooks";

export default function PostList() {
  const posts = usePostsState();

  return (
    <div>
      {posts.map((p, i) => (
        <React.Fragment key={"post-" + i}>
          <Post {...p} short={true} />
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
}
