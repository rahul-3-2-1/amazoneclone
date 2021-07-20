import React, { useState, useEffect } from "react";
import "../Css/order.css";
function Orders() {
  const [order, setOrder] = useState([]);
  const [size, setSize] = useState(0);
  const getorder = async () => {
    try {
      const data = await fetch("/getuserorder", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const res = await data.json();
      console.log(res);
      setSize(res.length);
      setOrder(res.reverse());
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getorder();
  }, []);
  return (
    <div className="orders">
      <h1 style={{ fontSize: "1.5rem", textAlign: "center" }}>
        Your Orders(Total items: {size})
      </h1>
      <div className="orders-section pt-3">
        <div>
          {order.map((item) => {
            return (
              <div className="orderproduct">
                <div className="orderdetails">
                  <div className="orderimg">
                    <img
                      className="orderimgcontainer"
                      src={item.pic}
                      alt="sdvdvsdv"
                    />
                  </div>
                  <div className="orderinfo">
                    <h5 style={{ fontSize: "1.03rem" }}>{item.title}</h5>
                    <p>₹ {item.price}</p>
                    <p>⭐⭐⭐⭐</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Orders;
