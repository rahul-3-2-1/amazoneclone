import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../Css/payment.css";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { Delete } from "../action";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
const CARD_OPTIONS = {
  iconStyle: "solid",
};
export default function Payment() {
  const stripe = useStripe();
  const [imgorder, setImgorder] = useState("");
  const dispatch = useDispatch();

  const elements = useElements();
  const history = useHistory();
  const myState = useSelector((state) => state.Reducer);
  const [succeeded, setSucceeded] = useState(false);

  const [total, settotal] = useState(0);

  useEffect(() => {
    let price = 0;
    for (var i = 0; i < myState.length; i++) {
      price += parseInt(myState[i].price);
    }
    settotal(price);
  }, [myState]);
  const func = () => {
    for (let i = 0; i < myState.length; i++) {
      dispatch(Delete(myState[i]));
    }
    history.push("/");
  };
  const setorder = async (id) => {
    for (let i = 0; i < myState.length; i++) {
      const data = await fetch("/allorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: myState[i].title,
          details: "ssdgsgsdgsdgsd",
          price: myState[i].price,
          rating: 4,
          img: myState[i].img,
        }),
      });
      dispatch(Delete(myState[i]));
      const response = await data.json();
      console.log(response);
    }

    history.push(`/orders:${id}`);
  };
  const handlesubmit = async (event) => {
    event.preventDefault();
    if (myState.length === 0) {
      toast.error("Add items Before to pay", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    const { paymentMethod } = await stripe.createPaymentMethod({
      type: "card",

      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    if (paymentMethod) {
      try {
        console.log("payment Rahul");
        const { id } = paymentMethod;
        const rpice = total * 100;
        const response = await fetch("/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: rpice, id }),
          credentials: "include",
        });
        console.log("rahul");

        if (response.status === 422) {
          console.log("rahul up");
          toast.error("Sign In to purchase item", {
            position: toast.POSITION.TOP_CENTER,
          });

          return;
        }
        for (let i = 0; i < myState.length; i++) {
          dispatch(Delete(i));
        }
        const res = await response.json();
        console.log(response);
        toast.success("Payment Successfull", {
          position: toast.POSITION.TOP_CENTER,
        });

        const urid = res.id;

        if (response.status === 200) {
          console.log(res.id);

          console.log("successful payment");
        }
        setorder(urid);
        setSucceeded(true);
      } catch (err) {
        console.log(err);
        alert("Sign In to purchase Item");
      }
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <div className="payment">
        <div className="delivery_section">
          <div className="delivery-heading">
            <h4>Delivery Address</h4>
          </div>
          <div className="delivery-address">
            <p>H.No 567,Lajpat Nagar </p>
            <p>New Delhi:-44</p>
            <p>India</p>
          </div>
        </div>
        <div className="horizontalline"></div>
        <div className="items">
          <div className="item-heading">
            <h4>Your Items</h4>
          </div>
          <div className="item-list">
            {myState.map((item, index) => {
              return (
                <div className="order_details">
                  <div className="order-img">
                    <img src={item.img} />
                  </div>
                  <div className="order-info">
                    <h5>{item.title}</h5>
                    <p>₹ {item.price}</p>
                    <p>⭐⭐⭐⭐</p>
                    <button onClick={() => dispatch(Delete(index))}>
                      Remove from basket
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="horizontalline"></div>
        <div className="payment-details">
          <div className="payment-heading">
            <h4>Payment Method</h4>
          </div>
          <div className="payment-method">
            <form onSubmit={handlesubmit}>
              <CardElement />
              <div className="payment_pricecontainer">
                <h3>Order total: ₹ {total}</h3>
                <button
                  style={{
                    backgroundColor: "rgb(209, 143, 68)",
                    border: "none",
                    padding: "2px 10px",
                    fontSize: "0.8rem",
                    fontWeight: "400",
                    border: "2px solid rgb(209, 209, 68)",
                  }}
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
