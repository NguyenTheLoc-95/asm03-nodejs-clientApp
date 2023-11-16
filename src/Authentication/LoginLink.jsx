import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { deleteSession } from "../Redux/Action/ActionSession";
import UserAPI from "../API/UserAPI";
function LoginLink(props) {
  const dispatch = useDispatch();

  const onRedirect = async () => {
    try {
      localStorage.clear();
     
      const action = deleteSession("");
      dispatch(action);
      const dele = await UserAPI.postSignout();
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <li className="nav-item" onClick={onRedirect}>
      <Link className="nav-link" to="/signin">
        ( Logout )
      </Link>
    </li>
  );
}

export default LoginLink;
