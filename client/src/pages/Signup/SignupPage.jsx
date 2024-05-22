import React, { useState } from "react";
import classes from "./SignupPage.module.css";
import { World } from "../../util/globe";
import { useSignup } from "../../hooks/useSignup";
import image from "../../assets/logo.png";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [luxorUsername, setLuxorUsername] = useState("");
  const [luxorKey, setLuxorKey] = useState("");
  const { signup, error, loading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, password, luxorUsername, luxorKey);
  };

  return (
    <div className={classes["container"]}>
      <div className={classes["left-container"]}>
        <form className={classes["form-container"]} onSubmit={handleSubmit}>
          <h1>Hashview</h1>
          <img alt="logo" src={image} className={classes["title-img"]}></img>
          <h3>Enter your information below to create an account.</h3>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <input
            type="text"
            placeholder="Luxor Username"
            onChange={(e) => setLuxorUsername(e.target.value)}
            value={luxorUsername}
          />
          <input
            type="text"
            placeholder="Luxor Key"
            onChange={(e) => setLuxorKey(e.target.value)}
            value={luxorKey}
          />
          {error && <p className={classes.error}>{error}</p>}
          <button disabled={loading} type="submit">
            Create Account
          </button>
        </form>
      </div>
      <div className={classes["right-container"]}>
        <div className={classes.globeBackground}>
          <World />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
