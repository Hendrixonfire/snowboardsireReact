import React, { useState, useRef } from 'react';
import {Link, useNavigate, redirect} from 'react-router-dom'
import Form from "react-validation/build/form";
import { Helmet } from "react-helmet"
import AuthService from "./services/auth.service";
const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};


  
    const Login = () => {
      const form = useRef();
      const [loginEmail, setLoginEmail] = useState('')
      const [loginPassword, setLoginPassword] = useState('')
      const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState("");
      const navigate = useNavigate();

      const onChangeEmail = (e) => {
        const email = e.target.value;
        setLoginEmail(email);
      };
    
      const onChangePassword = (e) => {
        const password = e.target.value;
        setLoginPassword(password);
      };
    
      const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        form.current.validateAll();
    
        AuthService.login(loginEmail, loginPassword).then(
            (res) => {
              if (res){
                navigate("/");
              }
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              setLoading(false);
              setMessage(resMessage);
              alert('Authentication failed: try again');
            }
          );
      }
   
    return(
      <>
        <div className="LoginPageContainer" >
              <nav className="navigationLogin">
              <Link to="/">  <img className="logoLogin" src="/images/SA_Primary_Black_Lettering_CMYK_40795a05-689d-4bb9-95de-a4b1596bfaa0_110x.avif" width="55" height="55"  alt="" />  </Link> 
              </nav>
            
              <div className="loginFormDivLogin">
                  <span className="iconCloseLogin"></span>
              <div className="formBoxLogin loginLogin">
                  <h2>Login</h2>
                  <div className="errorDivLogin">
                  
                <div>
                    <Form onSubmit={handleLogin} ref={form}>
                      <div className="inputBoxLogin">
                          <span className="iconLogin"><ion-icon name="mail-outline"></ion-icon></span>
                          <input className="loginInputLogin" type="email" id="email" name="email" required  onChange={onChangeEmail}  validations={[required]}/>
                          <label>Email</label>
                      </div>
                      <div className="inputBoxLogin">
                          <span className="iconLogin"><ion-icon name="lock-closed-outline"></ion-icon></span>
                          <input className="loginInputLogin"  type="password" id="password" name="password" required  onChange={onChangePassword} validations={[required]}/>
                          <label>Password</label>
                      </div>
                      <div className="rememberForgotLogin">
                          <label>
                              <input className="loginInputCheckBoxLogin" type="checkbox" />
                              Remember me
                          </label>
                          <a href="/">Forgot Password?</a>
                      </div>
                      <button type="submit" className="btnLogin">Login</button>
                      <div className="loginRegisterLogin">
                          <p>Don't have an account? <Link to="/Register" className="registerLinkLogin">Register</Link></p>
                      </div>
                
                      </Form>
                </div>
              </div>
              </div>
              </div>
                
            <Helmet>
            <script  src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"/>
            </Helmet>
    </div>
    </>
    )


}

export default Login;
