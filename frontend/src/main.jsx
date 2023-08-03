import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./Store.js";
import LogIn from "./screens/LogIn.jsx";
import SignUpScreen from "./screens/SignUpScreen.jsx";
import Navbar from "./components/Navbar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <BrowserRouter>
      <React.StrictMode>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUpScreen />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
