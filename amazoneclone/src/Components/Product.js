import React from "react";
import "../Css/Product.css";
import { useDispatch } from "react-redux";
import { Add } from "../action/index";
import { useSelector } from "react-redux";

export default function Product(props) {
  const dispatch = useDispatch();
  const State = useSelector((state) => state.Reducer);
  const user = useSelector((state) => state.setUser);

  const { id, title, price, img } = props;
  let cname = props.className;
  cname = cname + " " + "product";
  console.log(cname);

  const Update = () => {
    dispatch(Add({ id, title, price, img }));

    //
  };
  return (
    <div className={cname}>
      <div className="product_info">
        {/* <div className="triangle"></div> */}
        <p style={{ fontSize: "0.9rem", fontWeight: "500", margin: "2px" }}>
          {props.title}
        </p>
        <p className="product_price">
          <small>₹ </small>
          <strong style={{ fontSize: "20px", fontWeight: "600" }}>
            {props.price}
          </strong>
        </p>
        <div className="product_rating">
          <p>⭐</p>
          <p>⭐</p>
          <p>⭐</p>
          <p>⭐</p>
        </div>
        <div className="img-container">
          <div>
            <img src={props.img} alt="laptop pic" />
          </div>
        </div>

        <div className="addtobasket">
          <button onClick={Update}>Add to Basket</button>
        </div>
      </div>
    </div>
  );
}
