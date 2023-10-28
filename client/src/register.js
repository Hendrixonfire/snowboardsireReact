
import React, { useState, useRef } from 'react';
import { Helmet } from "react-helmet"
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";
// import axios from 'axios'
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
const Register = () => {
    const [registerUsername, setRegisterUsername] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    let navigate = useNavigate(); 
    
    // const register = () => {
    //     axios({
    //       method: 'POST',
    //       data:{
    //         username: registerUsername,
    //         email:registerEmail,
    //         password: registerPassword
    //       },
    //       withCredentials: true,
    //       url: "http://localhost:4000/register"
    //     })
    //     .then((res)=> {
    //        if (res.status === 200) {
    //         routeChange();
    //        } else{
    //         console.log(res);
    //        }
    //     }
           
    //     );
    //   }
    const form = useRef();
  
    const handleRegister = (e) => {

      e.preventDefault();
      form.current.validateAll();
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
                    <button type="submit" className="btnRegister" >Register</button>
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

// import React, { useState, useRef } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";

// import AuthService from "./services/auth.service";

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="invalid-feedback d-block">
//         This field is required!
//       </div>
//     );
//   }
// };

// const validEmail = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <div className="invalid-feedback d-block">
//         This is not a valid email.
//       </div>
//     );
//   }
// };

// const vusername = (value) => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="invalid-feedback d-block">
//         The username must be between 3 and 20 characters.
//       </div>
//     );
//   }
// };

// const vpassword = (value) => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="invalid-feedback d-block">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };

// const Register = (props) => {
//   const form = useRef();
//   const checkBtn = useRef();

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [successful, setSuccessful] = useState(false);
//   const [message, setMessage] = useState("");

//   const onChangeUsername = (e) => {
//     const username = e.target.value;
//     setUsername(username);
//   };

//   const onChangeEmail = (e) => {
//     const email = e.target.value;
//     setEmail(email);
//   };

//   const onChangePassword = (e) => {
//     const password = e.target.value;
//     setPassword(password);
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();

//     setMessage("");
//     setSuccessful(false);

//     form.current.validateAll();

//     if (checkBtn.current.context._errors.length === 0) {
//       AuthService.register(username, email, password).then(
//         (response) => {
//           setMessage(response.data.message);
//           setSuccessful(true);
//         },
//         (error) => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();

//           setMessage(resMessage);
//           setSuccessful(false);
//         }
//       );
//     }
//   };

//   return (
//     <div className="col-md-12">
//       <div className="card card-container">
//         <img
//           src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//           alt="profile-img"
//           className="profile-img-card"
//         />

//         <Form onSubmit={handleRegister} ref={form}>
//           {!successful && (
//             <div>
//               <div className="form-group">
//                 <label htmlFor="username">Username</label>
//                 <Input
//                   type="text"
//                   className="form-control"
//                   name="username"
//                   value={username}
//                   onChange={onChangeUsername}
//                   validations={[required, vusername]}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <Input
//                   type="text"
//                   className="form-control"
//                   name="email"
//                   value={email}
//                   onChange={onChangeEmail}
//                   validations={[required, validEmail]}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <Input
//                   type="password"
//                   className="form-control"
//                   name="password"
//                   value={password}
//                   onChange={onChangePassword}
//                   validations={[required, vpassword]}
//                 />
//               </div>

//               <div className="form-group">
//                 <button className="btn btn-primary btn-block">Sign Up</button>
//               </div>
//             </div>
//           )}

//           {message && (
//             <div className="form-group">
//               <div
//                 className={
//                   successful ? "alert alert-success" : "alert alert-danger"
//                 }
//                 role="alert"
//               >
//                 {message}
//               </div>
//             </div>
//           )}
//           <CheckButton style={{ display: "none" }} ref={checkBtn} />
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Register;