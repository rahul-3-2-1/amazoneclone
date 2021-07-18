import React, { useState } from "react";
import "../Css/login.css";
import Logo from "../img/amazon.png";
// import { useHistory } from "react-router";
import { NavLink, useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { notify } from "../../../server/route/userinfo";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const notify = (mssg) => {
    toast.error(mssg, { position: toast.POSITION.TOP_CENTER });
  };
  const notify1 = (mssg) => {
    toast.success(mssg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  };
  const send = async (e) => {
    try {
      e.preventDefault();
      const data = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const res = await data.json();
      if (data.status === 422) {
        notify(res.mssg);
        return;
      }
      notify1("LogIn Successfully");

      history.push("/");
      console.log(res);
      console.log("rahul");
    } catch (err) {
      console.log(err);
    }
  };
  const register = async (e) => {
    try {
      e.preventDefault();
      console.log("rahul");
      const data = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();
      if (data.status === 422) {
        notify(res.message);
        return;
      }
      notify1(res.message);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="loginpage">
      <div className="loginpadding">
        <div className="logo">
          <NavLink to="/">
            <img src={Logo} alt="logo pic" />
          </NavLink>
        </div>
        <div className="inner_login">
          <div>
            <h2 style={{ fontWeight: "400" }}>Sign-in</h2>
          </div>
          <form>
            <div>
              <label className="fw-bold" for="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
              />
            </div>
            <div>
              <label className="fw-bold" for="pass">
                Password
              </label>
              <input
                id="pass"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="buutn">
              <button onClick={send}>SignIn</button>
            </div>
          </form>
          <div className="buutn">
            <button onClick={(e) => register(e)}>Create Your Account</button>
          </div>
        </div>
        <div className="experiment"></div>
      </div>
    </div>
  );
};
export default Login;
