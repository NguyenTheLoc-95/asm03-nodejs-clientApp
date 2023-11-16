import React from "react";
import classes from "./productList.module.css";
import { Link } from "react-router-dom";
const ProductList = (props) => {
  return (
    <div>
      {props.onData.length > 0 && (
        <div className={classes.product}>
          {props.onData.map((el) => {
            const price = el.price;
            const change = new Intl.NumberFormat().format(price);
            return (
              <a key={el.name} target="_blank" href={`/detail/${el._id}`}>
                <div>
                  <img src={el.img1} alt={el.name}></img>
                  <h5>{el.name}</h5>
                  <p>{change} VND</p>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default ProductList;
