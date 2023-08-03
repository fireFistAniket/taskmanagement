import React, { useEffect, useState } from "react";
import styles from "./styles/SignUpScreen.module.scss";
import { signUp } from "../api/signUpApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../slices/loginSlice";
const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoggedIn = useSelector((state) => state.logIn.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, []);
  const handelSubmit = async (e) => {
    e.preventDefault();
    const user = await signUp({ name, email, password });
    dispatch(getData(user));
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };
  return (
    <main className={styles.mainPage}>
      <form
        className={`txt-style ${styles.SignUpScreen}`}
        onSubmit={(e) => {
          handelSubmit(e);
        }}
      >
        <div>
          <label htmlFor="name">name</label>
          <input
            type="text"
            placeholder="enter your name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">email id</label>
          <input
            type="email"
            placeholder="enter your email id"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            placeholder="enter your password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">confirm password</label>
          <input
            type="password"
            placeholder="confirm your password"
            id="confirmPassword"
          />
        </div>
        <div>
          <button className={styles.signUpBtn}>sign up</button>
        </div>
      </form>
      <div>
        <h3>
          already have an account? <Link to="/login">log in</Link>
        </h3>
      </div>
    </main>
  );
};

export default SignUpScreen;
