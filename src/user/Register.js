import React, { useState, useContext } from 'react';

import { StateContext } from '../contexts';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const { dispatch } = useContext(StateContext);

  function handleUsername(evt) {
    setUsername(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handlePasswordRepeat(evt) {
    setPasswordRepeat(evt.target.value);
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        dispatch({ type: 'REGISTER', username });
      }}
    >
      <label htmlFor="register-username">Username: </label>
      <input
        type="text"
        value={username}
        onChange={handleUsername}
        name="register-username"
        id="register-username"
      />
      <label htmlFor="register-password">Password: </label>
      <input
        type="password"
        value={password}
        onChange={handlePassword}
        name="register-password"
        id="register-password"
      />
      <label htmlFor="register-password-repeat">Repeat Password: </label>
      <input
        type="password"
        value={passwordRepeat}
        onChange={handlePasswordRepeat}
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
