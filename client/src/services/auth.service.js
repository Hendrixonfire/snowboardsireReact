import axios from "axios";
import {useNavigate} from 'react-router-dom'
// import { listeners } from "../../../backend/userReview";


const register = (registerUsername, registerEmail, registerPassword) => {
  return axios.post('https://snowboardaddictionreact.onrender.com/api/register', {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword
  })
  .then((response) => {
 
    console.log(response);
    
});
}
const login = (loginEmail, loginPassword) => {
  return axios.post('https://snowboardaddictionreact.onrender.com/api/login', {
              email: loginEmail,
              password: loginPassword
          })
    .then((response) => {
      if (response.data.email) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      
      }

      return response.data;
    });
};


 const logout = () => {
   localStorage.removeItem("user");
   localStorage.removeItem("cart");
   return axios.post('https://snowboardaddictionreact.onrender.com/api/logout?_method=DELETE').
   then((response) => {
  
     return response.data;
   
   });
   
 
   

 };

 const getCurrentUser = () => {
   return JSON.parse(localStorage.getItem("user"));
 };

 const joinLesson = (lessonUsername,param1,param2) => {
  return axios.post('https://snowboardaddictionreact.onrender.com/api/joinLesson',{
    username: lessonUsername,
    lessonType:  param2,
    lessonDate: param1

  })
  .then((response) =>{
    console.log(response);
  })
}

const placeOrder = (cartUsername,param1) => {
  return axios.post('https://snowboardaddictionreact.onrender.com/api/placeorder',{
    username: cartUsername,
    data:  param1
   

  })
  .then((response) =>{
    console.log(response);
  })
}

const leaveLesson = (lessonUsername,param1,param2) => {
  return axios.post('https://snowboardaddictionreact.onrender.com/api/leaveLesson',{
    username: lessonUsername,
    lessonType:  param2,
    lessonDate: param1

  })
  .then((response) =>{
    console.log(response);
  })
}
// const getData = (lessonUsername) =>{
//   let data = '';
//   return   { data } = axios.get("http://localhost:4000/api/sessions",{
//     username: lessonUsername
//   })
//   .then((response) =>{
//     console.log(response);

  
//   })
  
  
 


// }



const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  joinLesson,
  leaveLesson,
  placeOrder
  
  
}




export default AuthService;
