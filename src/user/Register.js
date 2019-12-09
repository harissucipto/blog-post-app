import React, { useEffect } from "react";
import { useResource } from "react-request-hook";
import { useInput } from "react-hookedup";

import { useDispatch } from "../hooks";

export default function Register() {
  const { value: username, bindToInput: bindUsername } = useInput("");
  const { value: password, bindToInput: bindPassword } = useInput("");
  const { value: passwordRepeat, bindToInput: bindPasswordRepeat } = useInput(
    ""
  );

  const dispatch = useDispatch();

  const [user, register] = useResource((username, password) => ({
    url: "/users",
    method: "post",
    data: { username, password }
  }));

  useEffect(() => {
    if (user && user.data) {
      dispatch({ type: "REGISTER", username: user.data.username });
    }
  }, [dispatch, user]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        register(username, password);
      }}
    >
      <label htmlFor="register-username">Username: </label>
      <input
        type="text"
        value={username}
        {...bindUsername}
        name="register-username"
        id="register-username"
      />
      <label htmlFor="register-password">Password: </label>
      <input
        type="password"
        value={password}
        {...bindPassword}
        name="register-password"
        id="register-password"
      />
      <label htmlFor="register-password-repeat">Repeat Password: </label>
      <input
        type="password"
        value={passwordRepeat}
        {...bindPasswordRepeat}
        name="register-password-repeat"
        id="register-password-repeat"
      />
      <input
        type="submit"
        value="Register"
        disabled={username.length === 0 || password !== passwordRepeat}
      />
    </form>
  );
}
