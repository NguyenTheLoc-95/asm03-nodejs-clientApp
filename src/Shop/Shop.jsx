/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, Fragment } from "react";
/* import queryString from "query-string"; */
import ProductAPI from "../API/ProductAPI";
/* import { Link } from "react-router-dom";
import Search from "./Component/Search";
import Pagination from "./Component/Pagination";
import Products from "./Component/Products";
import SortProduct from "./Component/SortProduct";
import convertMoney from "../convertMoney"; */
///

import classes from "./shop.module.css";
import ProductList from "./Component/productList";

function Shop(props) {
  const [data, setData] = useState([]);
  const [chance, setChance] = useState();
  const getData = async () => {
    const response = await ProductAPI.getAPI();
    setData(response);
    
  };
  useEffect(() => {
    getData();
  }, []);
 
  const changeData = (prop) => {
    setChance( data.filter((el) => {
      if (prop === "all") {
        return el;
      } else {
        return el.category === prop;
      }
    }))
 
  };
  


  //render shopPage
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>SHOP</h1>
        <p>SHOP</p>
      </header>

      <div className={classes.nav}>
        <span className={classes.navBar}>
          <nav>
            <h2>CATEGORIES</h2>

            <ul>
              <h4>APPLE</h4>
              <li onClick={changeData.bind(null, "all")}>All</li>
              <h5>IPHONE & MAC</h5>
              <li onClick={changeData.bind(null, "iphone")}>Iphone</li>
              <li onClick={changeData.bind(null, "ipad")}>Ipad</li>
              <li onClick={changeData.bind(null, "macbook")}>Macbook</li>
              <h5>WIRELESS</h5>
              <li onClick={changeData.bind(null, "airpod")}>Airpod</li>
              <li onClick={changeData.bind(null, "watch")}>Watch</li>
              <h5>OTHER</h5>
              <li>Mouse</li>
              <li>Keyboard</li>
              <li>Other</li>
            </ul>
          </nav>
        </span>
        <div className={classes.input}>
          <span>
            <input placeholder="Enter search here"></input>
          </span>
          <span>
            <select>
              <option>Default sorting</option>
            </select>
          </span>
        </div>
        <span>
          <ProductList onData={chance=== undefined ? data : chance} />
        </span>
      </div>
    </Fragment>
  );
}

export default Shop;
