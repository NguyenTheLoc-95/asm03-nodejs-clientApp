import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import { addSession } from "../Redux/Action/ActionSession";
import "./Auth.css";
import LoadingSpinner from "../Share/SpinLoader/Spin";
/* import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider, provider2, provider3 } from "../firebase/config"; */

function SignIn(props) {
  //listCart được lấy từ redux
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [emailRegex, setEmailRegex] = useState("");

  const [redirect, setRedirect] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  /*   const onGoogle = () => {
    const siginGG = signInWithPopup(auth, provider2)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token, result);
      })
      .catch((err) => console.log(err));

    return siginGG;
  }; */
  /*  const onFacebook = () => {
    
    const siginFB = signInWithPopup(auth, provider)
      .then((result) => console.log(result))
      .catch((err) => {console.log(err);
      return;});
  
      return siginFB
  };
 
  const onGithub = () => {
    
    const siginGH = signInWithPopup(auth, provider3)
      .then((result) => console.log(result.user))
      .catch((err) => console.log(err));
  
      return siginGH
  }; */

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      const user = {
        email: email,
        password: password,
      };
      const response = await UserAPI.postSignin(user);

     
      
      localStorage.setItem("name_user", response.user.fullname);
      const action = addSession(response.user.fullname);
      dispatch(action);
      setIsLoading(false)
      setRedirect(true);
      /*  setCheckPush(true); */
    } catch (er) {
      setIsLoading(false)
      if (er.response) {
        setEmailRegex(er.response.data.message);
        return;
      }
      console.log(er);
    }
  };

  return (
    <div className="limiter">
     
      <div className="container-login100">
        
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
       
          <span className="login100-form-title p-b-33">Sign In</span>
          {isLoading===true&&<LoadingSpinner/>}
          <div className="d-flex justify-content-center pb-5">
            {emailRegex && <span className="text-danger">* {emailRegex}</span>}
          </div>

          <div className="wrap-input100 validate-input">
            <input
              className="input100"
              type="text"
              placeholder="Email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <div className="container-login100-form-btn m-t-20">
            {redirect && <Redirect to={`/`} />}
            <button className="login100-form-btn" onClick={onSubmit} disabled={isLoading}>
              Sign in
            </button>
            {/*  <button
              className="btn  mt-3 px-5 mx-auto"
              style={{ width: "100%", color: "blue" }}
              onClick={onFacebook}
            >
              Login with Facebook
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                style={{ marginLeft: "5%" }}
                fill="currentColor"
                class="bi bi-facebook"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </button>
          
            <button
              className="btn px-5 mx-auto"
              style={{ width: "100%", color: "blue" }}
              onClick={onGithub}
            >
              Login with GitHub
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                style={{ marginLeft: "5%" }}
                height="18"
                fill="currentColor"
                class="bi bi-envelope"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
              </svg>
            </button> 
            <button
              className="btn px-5 mx-auto"
              style={{ width: "100%", color: "blue" }}
              onClick={onGoogle}
            >
              Login with Google
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                style={{ marginLeft: "5%" }}
                height="18"
                fill="currentColor"
                class="bi bi-envelope"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
              </svg>
            </button>*/}
          </div>

          <div className="text-center p-t-45 p-b-4">
            <span className="txt1">Create an account?</span>
            &nbsp;
            <Link to="/signup" className="txt2 hov1">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
