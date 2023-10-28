import React, { useState, useRef } from 'react';
import {Link, useNavigate, redirect} from 'react-router-dom'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Helmet } from "react-helmet"
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


  
 
  // const [loginEmail, setLoginEmail] = useState('')
  // const [loginPassword, setLoginPassword] = useState('')
   
    /*
    const [isLogged, setIsLogged] = useState(false)

    const buttonHandler = () => {
      setIsLogged(current => !current)
    }

      useEffect( () => {
        console.log(isLogged);
    }, [isLogged]);
*/
    // let navigate = useNavigate(); 
    // const routeChange = (userRes,emailRes, isLogged) =>{ 
    
    //   let path = `/`; 
    //   navigate(path, { state: { user: userRes, email: emailRes, logged: isLogged} });
    
    // const login = () => {
    //   /*
    //     buttonHandler();
    //     console.log(isLogged);
    //     */
    //     axios({
    //       method: 'POST',
    //       data:{
    //         email: loginEmail,
    //         password: loginPassword
    //       },
    //       withCredentials: true,
    //       url: "http://localhost:4000/login"
    //     })
    //     .then((res)=>{
       
    //         if (res) {
    //         let isLogged = true;
    //         let userRes = res.data.user;
    //         let emailRes = res.data.email;
    //         console.log(userRes);      
    //          console.log(isLogged);
    //          routeChange(userRes,emailRes, isLogged);
    //         } else {
    //          alert('authentication failed')
    //         }
          
           
            
    //      });
    
    //   }


    //   axios.interceptors.response.use(response => {
    //     return response
    //   }
    //  , error => {
  
    //  if (error.response.status === 401) {
    //   window.location.href = '/login';
    // }
  
    //  });
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
              // navigate("/", {isLoggedIn: localStorage.getItem("user")});
            
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
            <span className="iconCloseLogin"><ion-icon name="close-outline"></ion-icon></span>
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

// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";

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

// const Login = () => {
//   const form = useRef();
//   const checkBtn = useRef();

//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   const onChangeUsername = (e) => {
//     const email = e.target.value;
//     setLoginEmail(email);
//     console.log(loginEmail);
//   };

//   const onChangePassword = (e) => {
//     const password = e.target.value;
   
//     setLoginPassword(password);
//     console.log(loginPassword);
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     setMessage("");
//     setLoading(true);

//     form.current.validateAll();

//     if (checkBtn.current.context._errors.length === 0) {
//       AuthService.login(loginEmail, loginPassword).then(
//         () => {
//           console.log(localStorage.getItem("user"));
//           navigate("/");
//           // window.location.reload();
//         },
//         (error) => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();

//           setLoading(false);
//           setMessage(resMessage);
//         }
//       );
//     } else {
//       setLoading(false);
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

//         <Form onSubmit={handleLogin} ref={form}>
//           <div className="form-group">
//             <label htmlFor="username">Username</label>
//             <Input
//               type="text"
//               className="loginInputLogin"
//               name="username"
//               value={loginEmail}
//               onChange={onChangeUsername}
//               validations={[required]}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <Input
//               type="password"
//               className="loginInputLogin"
//               name="password"
//               value={loginPassword}
//               onChange={onChangePassword}
//               validations={[required]}
//             />
//           </div>

//           <div className="form-group">
//             <button className="btn btn-primary btn-block" disabled={loading}>
//               {loading && (
//                 <span className="spinner-border spinner-border-sm"></span>
//               )}
//               <span>Login</span>
//             </button>
//           </div>

//           {message && (
//             <div className="form-group">
//               <div className="alert alert-danger" role="alert">
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

// export default Login;