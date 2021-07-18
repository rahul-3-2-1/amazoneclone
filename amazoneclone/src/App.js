import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Checkout from "./Components/Checkout";
import Order from "./Components/Orders";

import Login from "./Components/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import Payment from "./Components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ToastContainer } from "react-toastify";

const promise = loadStripe(
  "pk_test_51JASnYSFdJtvFuPG9tZ5MXKIr92jLwW5jI7XPaju4n0pnPUQNvUJrt2cAIaREVveBBCi2d4HRO2yGuLO8KhHsv4t003LVdjzQv"
);

function App() {
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
        <Route exact path="/orders:id">
          <Header />
          <Order />
        </Route>
        <Route exact path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/payment">
          <Header />
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        </Route>
      </Switch>
    </>
  );
}

export default App;
