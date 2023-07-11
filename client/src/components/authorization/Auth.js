import React, { useState } from "react";
import "./Auth.scss";
import { useCookies } from "react-cookie";

function Auth() {
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [password, setPassword] = useState(null);

  const toggleLogin = (isLogin) => {
    setIsLogin(isLogin);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password != confirmPassword) {
      setError("Make sure passwords match!");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);

      window.location.reload();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form action="">
          <h2>{isLogin ? "Please Log in" : "Please Sign up!"}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => toggleLogin(false)}
            style={{
              backgroundColor: !isLogin
                ? "rgb(255,255,255)"
                : "rgb(188,188,188)",
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => toggleLogin(true)}
            style={{
              backgroundColor: isLogin
                ? "rgb(255,255,255)"
                : "rgb(188,188,188)",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
