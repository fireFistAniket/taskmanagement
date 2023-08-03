import React, { useEffect, useState } from "react";
import styles from "./styles/LoginScreen.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIN } from "../api/logInApi";
import { getData } from "../slices/loginSlice";
const LogIn = () => {
  const isLoggedIn = useSelector((state) => state.logIn.isLoggedIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, []);
  const handelSubmit = async (e) => {
    e.preventDefault();
    const user = await logIN({ email, password });
    dispatch(getData(user));
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };
  return (
    <main className={styles.mainPage}>
      <form
        className={`txt-style ${styles.LoginScreen}`}
        onSubmit={(e) => {
          handelSubmit(e);
        }}
      >
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
          <button className={styles.signUpBtn}>sign up</button>
        </div>
      </form>
      <div>
        <h3>
          New here? <Link to="/signup">register</Link>
        </h3>
      </div>
    </main>
  );
};

export default LogIn;
