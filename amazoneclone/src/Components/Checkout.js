import React, { useState, useEffect } from "react";
import "../Css/checkout.css";
import { useSelector, useDispatch } from "react-redux";
import Discount from "../img/discount.jpg";
import { useHistory } from "react-router-dom";
import { Delete } from "../action/index";
import FlipMove from "react-flip-move";
// import CSSTransitionGroup from "react-transition-group";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Checkout() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState("");
  const myState = useSelector((item) => item.Reducer);
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
      // console.log(myState);

      setUser(res.email);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, [myState]);
  const setvalue = () => {
    let sm = 0;
    for (let i = 0; i < myState.length; i++) {
      sm += parseInt(myState[i].price);
    }
    return sm;
  };
  const cnt = () => {
    return myState.length;
  };
  useEffect(() => {
    func();
  }, []);
  return (
    <>
      <div style={{ backgroundColor: "#fff" }}>
        <div className="checkout">
          <div className="Checkout_left">
            <div className="discount_div">
              <img
                className="image_discount"
                src={Discount}
                alt="discout_img"
              />
            </div>
            <div style={{ paddingLeft: "8px" }} className=" guest">
              <p className="fs-4">hello, {!user ? "Guest" : user}</p>
              <p
                style={{ fontWeight: "500px" }}
                className="fs-3 mx-1 shoppingbasket"
              >
                Your shopping basket
              </p>
              <hr
                style={{ border: "2px solid black", backgroundColor: "black" }}
              />
            </div>
          </div>
          <div className="Checkout_right">
            <div className="basket_right">
              <div>
                <p>
                  total amount <strong>: ₹ {setvalue()}</strong>
                </p>
                <p>
                  total item<strong>: {cnt()}</strong>
                </p>

                <div className="addtobaskets pay">
                  <button
                    style={{ border: "2px solid rgb(209, 209, 148)" }}
                    onClick={() => {
                      history.push("/payment");
                    }}
                  >
                    Proceed to pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* <FlipMove data-aos="fade-left"> */}
          {/* <CSSTransitionGroup transitionName="example"> */}
          {myState.map((item, index) => {
            return (
              <>
                <FlipMove data-aos="fade-left">
                  <div
                  //  data-aos="fade-up"
                  >
                    <div className="checkout_info">
                      <div style={{ flex: "0.25" }} className="img">
                        <img src={item.img} alt="laptop pic" />
                      </div>
                      <div style={{ flex: "0.75" }} className="product_details">
                        <h5>{item.title}</h5>
                        <p className="prodect_price">
                          <small>$</small>
                          <strong>{item.price}</strong>
                        </p>
                        <div className="product_rating">
                          <p>⭐</p>
                          <p>⭐</p>
                          <p>⭐</p>
                          <p>⭐</p>
                        </div>
                        <div>
                          <button
                            className="rmbtn"
                            style={{
                              backgroundColor: "rgb(209, 143, 68)",

                              padding: "5px",
                              fontSize: "0.8rem",
                              fontWeight: "400",
                              border: "2px solid rgb(209, 209, 148)",
                            }}
                            onClick={() => {
                              console.log(myState.length);

                              dispatch(Delete(index));
                            }}
                          >
                            Remove from Basket
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div style={{ borderTop: "1px solid black" }}></div> */}
                </FlipMove>
              </>
            );
          })}
          {/* </FlipMove> */}
        </div>
      </div>
    </>
  );
}
