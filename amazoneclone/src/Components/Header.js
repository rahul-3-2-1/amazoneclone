import React, { useEffect, useState, useLayoutEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "../Css/header.css";

import Logo from "../img/amazon.png";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useSelector, useDispatch } from "react-redux";

function useWindowSixe() {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  console.log(size);
  return size;
}

function Header() {
  const history = useHistory();
  const myState = useSelector((state) => state.Reducer);

  const [user, setUser] = useState(null);
  const dsplay = useWindowSixe();
  const [userid, setUserid] = useState("");
  const [cls, setCls] = useState({});
  const [clsi, setClsi] = useState({});
  const [mobile, setMobile] = useState({
    display: "none",
  });

  const [cnt, setCnt] = useState(0);

  const signuser = async () => {
    try {
      if (user) {
        const data = await fetch("/logout", {
          method: "GET",

          credentials: "same-origin",
        });

        history.push("/");
        setUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const func = async () => {
    try {
      const data = await fetch("/userdata", {
        method: "GET",

        credentials: "include",
      });
      if (data.status === 422) {
        setUser(null);
        return;
      }
      const res = await data.json();

      setUser(res.email);
      setUserid(res.id);
    } catch (err) {
      console.log(err);
    }
  };
  const change = () => {
    if (mobile.display === "none") {
      setMobile({ display: "block" });
    } else {
      setMobile({ display: "none" });
    }
  };

  useEffect(() => {
    func();
  }, []);
  useEffect(() => {
    setCnt(myState.length);
  }, [myState]);
  useEffect(() => {
    if (dsplay < 500) {
      setCls({ display: "block" });
      setClsi({ display: "none" });
    } else {
      setMobile({ display: "none" });
      setCls({ display: "none" });
      setClsi({ display: "flex" });
    }
    console.log("rahul");
  }, [dsplay]);
  return (
    <>
      <div
        className="hdr"
        style={{
          position: "sticky",
          top: "0",
          zIndex: "1000",
          opacity: "0.95",
        }}
      >
        <div className="header">
          <div
            onClick={() => {
              change();
            }}
            style={cls}
            className="hambergar"
          >
            <MenuIcon className="hmg" />
          </div>

          <NavLink exact activeClassName="active" to="/">
            <img className="header_logo" src={Logo} alt="logo" />
          </NavLink>

          <div className="header_search">
            <input type="text" className="header_searchInput" />
            <SearchIcon className="search_icon" />
            {/* {logo} */}
          </div>
          <div style={clsi} className="header_nav">
            <NavLink
              exact
              activeClassName="active"
              onClick={signuser}
              style={{ textDecoration: "none" }}
              to={!user && "/login"}
            >
              <div className="header_option">
                <span className="header_option1">
                  Hello {!user ? "Guest" : user}
                </span>
                <span className="header_option2 ">
                  {user ? "Sign Out" : "Sign In"}
                </span>
              </div>
            </NavLink>
            <NavLink
              exact
              activeClassName="active"
              to={!userid ? "/login" : `/orders:${userid}`}
              style={{ textDecoration: "none" }}
            >
              <div className="header_option">
                <span className="header_option1 ">Returns</span>
                <span className="header_option2 ">& Orders</span>
              </div>
            </NavLink>
          </div>
          <div className="basket ms-2">
            <NavLink exact activeClassName="basket" to="/checkout">
              <ShoppingBasketIcon className="icon" style={{ color: "white" }} />
            </NavLink>
            <span
              style={{ color: "white", fontWeight: "500", margin: "10px" }}
              className="basket_item_count"
            >
              {cnt}
            </span>
          </div>
        </div>
        <div>
          <div style={mobile} className="header_nav mobile-nav pb-2 bg-dark">
            <div>
              <NavLink
                exact
                activeClassName="active"
                onClick={signuser}
                style={{ textDecoration: "none" }}
                to={!user && "/login"}
              >
                <div className="header_option">
                  <div className="fs-6"> Hello {!user ? "Guest" : user}</div>

                  <div className="fw-bold">
                    {" "}
                    {user ? "Sign Out" : "Sign In"}
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="mt-2 ">
              <NavLink
                exact
                activeClassName="active"
                to={!userid ? "/login" : `/orders:${userid}`}
                style={{ textDecoration: "none" }}
              >
                <div className="header_option">
                  <div className="fs-6">Returns</div>{" "}
                  <div className="fw-bold fs-6">& Orders</div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
