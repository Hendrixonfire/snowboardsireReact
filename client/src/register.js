
import React, { useState, useRef } from 'react';
import { Helmet } from "react-helmet"
import {Link, useNavigate } from 'react-router-dom'
import Form from "react-validation/build/form";
import AuthService from "./services/auth.service";
import { motion } from "framer-motion";
import '../src/dist/loadingstate.css'

const Register = () => {
    const [registerUsername, setRegisterUsername] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [registerEmail, setRegisterEmail] = useState('')
    let navigate = useNavigate(); 
    const form = useRef();
    
    const handleRegister = (e) => {
      e.preventDefault();
      form.current.validateAll();
      setLoading(true);
        AuthService.register(registerUsername, registerEmail, registerPassword).then(
          () => {
              navigate("/Login");
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
            }
          );
      }

    return(
      <div className="RegisterPageContainer">
            <nav className="navigationRegister">
              <Link to="/">  <img className="logoRegister" src="/images/SA_Primary_Black_Lettering_CMYK_40795a05-689d-4bb9-95de-a4b1596bfaa0_110x.avif" width="55" height="55"  alt="" /></Link>
            </nav>
            <div className="loginFormDivRegister">
            <div className="formBoxRegister registerRegister">
                <h2>Registration</h2>
           <Form onSubmit={handleRegister} ref={form}>
                    <div className="inputBoxRegister">
                    <span className="iconRegister"><ion-icon name="people-outline"></ion-icon></span>
                    <input className="loginInputRegister" type="text" id="username" name="username"required onChange={e => setRegisterUsername(e.target.value)} />
                    <label>Username</label>
                    </div>
                    <div className="inputBoxRegister">
                    <span className="iconRegister"><ion-icon name="mail-outline"></ion-icon></span>
                    <input className="loginInputRegister" type="email" id="email" name="email" required onChange={e => setRegisterEmail(e.target.value)}/>
                    <label>Email</label>
                    </div>
                    <div className="inputBoxRegister">
                    <span className="iconRegister"><ion-icon name="lock-closed-outline"></ion-icon></span>
                    <input className="loginInputRegister"  type="password" id="password" name="password" required onChange={e => setRegisterPassword(e.target.value)}/>
                    <label>Password</label>
                    </div>
                    <div className="rememberForgotRegister">
                    <label>
                        <input className="loginInputCheckBoxRegister" type="checkbox" />
                    I agree to the terms & conditions
                    </label>
                    
                    </div>
                    {loading ?   <button type="submit" className="btnRegisterLoading" id="glow-on-hover-register-loading" >Making your Account....
                    <motion.div
                            className="loaderRegister"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                          >
                                <motion.div className="loadingCircleRegister"></motion.div>
                    </motion.div>
                    </button> :
                      (
                        <button type="submit" className="btnRegister" >Register</button>
                      )

                      }
              
                    <div className="loginRegisterRegister">
                    <p>Already have an account? <Link to="/Login" className="loginLinkRegister">Login</Link></p>
                    </div>
                    </Form>
                </div>
            </div>
            <Helmet>
            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        
            </Helmet>
    </div>
    )


}

 export default Register;

