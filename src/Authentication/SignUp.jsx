import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import "./Auth.css";
import LoadingSpinner from "../Share/SpinLoader/Spin";
/* import queryString from "query-string";
import MessengerAPI from "../API/MessengerAPI"; */

SignUp.propTypes = {};

function SignUp(props) {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  /*   const [errorEmail, setEmailError] = useState(false);
  const [emailRegex, setEmailRegex] = useState(false);
  const [errorPassword, setPasswordError] = useState(false);
  const [errorFullname, setFullnameError] = useState(false);
  const [errorPhone, setPhoneError] = useState(false); */
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChangeName = (e) => {
    setFullName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handlerSignUp = async (e) => {
    e.preventDefault();
setIsLoading(true)
    try {
      const user = {
        fullname: fullname,
        email: email,
        password: password,
        phone: phone,
      };

      const response = await UserAPI.postSignUp(user);

      setSuccess(true);
      setIsLoading(false);
    } catch (er) {
      setIsLoading(false);
      if (er.response) {
        setError(er.response.data.message);
        return;
      }
      console.log(er);
    }

    // Hàm này dùng để tạo các conversation cho user và admin
    /* const fetchConversation = async () => {
								const params = {
									email: email,
									password: password,
								};

								const query = '?' + queryString.stringify(params);

								const response = await MessengerAPI.postConversation(
									query
								);
								console.log(response);
							};

							fetchConversation(); */
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        {isLoading===true && <LoadingSpinner/>}
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <span className="login100-form-title p-b-33">Sign Up</span>
          <div className="d-flex justify-content-center pb-5">
            {error && <span className="text-danger">* {error}</span>}
          </div>
          <div className="wrap-input100 validate-input">
            <input
              className="input100"
              value={fullname}
              onChange={onChangeName}
              type="text"
              placeholder="Full Name"
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              value={email}
              onChange={onChangeEmail}
              type="text"
              placeholder="Email"
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              value={password}
              onChange={onChangePassword}
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              value={phone}
              onChange={onChangePhone}
              type="text"
              placeholder="Phone"
            />
          </div>

          <div className="container-login100-form-btn m-t-20">
            {success && <Redirect to={"/signin"} />}
            <button className="login100-form-btn" onClick={handlerSignUp}>
              Sign Up
            </button>
          </div>

          <div className="text-center p-t-45 p-b-4">
            <span className="txt1">Login?</span>
            &nbsp;
            <Link to="/signin" className="txt2 hov1">
              Click
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
