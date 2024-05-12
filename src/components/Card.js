import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReudcer";

export const Card = (props) => {
  const options = props.options;
  let data = useCart();
  const priceRef = useRef();
  let priceOptions = Object.keys(options);
  let foodItem = props.foods;
  let dispatch = useDispatchCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let finalPrice = qty * parseInt(options[size]);

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem.id) {
        food = item;
        break;
      }
    }
    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem.id,
          qty: qty,
          price: finalPrice,
        });
        return;
      } else if (food.size !== size) {
        console.log(food.size, size, "this is 35th......");
        await dispatch({
          type: "ADD",
          id: foodItem.id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return;
      }
      await dispatch({
        type: "ADD",
        id: foodItem.id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div
        className="card mt-3S"
        style={{ width: "18rem", maxHeight: "360px" }}
      >
        <img
          className="card-img-top"
          src={foodItem.img}
          alt="Card image cap"
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>

          <div className="container w-100">
            <select
              className="m-2 h-100  bg-success"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100  bg-success"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            <hr />
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
