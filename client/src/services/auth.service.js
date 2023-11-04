import axios from "axios";




const register = (registerUsername, registerEmail, registerPassword) => {
  return axios.post('/api/register', {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword
  })
  .then((response) => {
 
    console.log(response);
    
});
}

const login = (loginEmail, loginPassword) => {
  return axios.post('/api/login', {
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
   return axios.post('/api/logout?_method=DELETE').
   then((response) => {
  
     return response.data;
   
   });
 };

 const getCurrentUser = () => {
   return JSON.parse(localStorage.getItem("user"));
 };

 const joinLesson = (lessonUsername,param1,param2) => {
  return axios.post('api/joinLesson',{
    username: lessonUsername,
    lessonType:  param2,
    lessonDate: param1

  })
  .then((response) =>{
    console.log(response);
  })
}

const placeOrder = (cartUsername,param1) => {
  return axios.post('api/placeorder',{
    username: cartUsername,
    data:  param1
  })
  .then((response) =>{
    console.log(response);
  })
}

const leaveLesson = (lessonUsername,param1,param2) => {
  return axios.post('api/leaveLesson',{
    username: lessonUsername,
    lessonType:  param2,
    lessonDate: param1

  })
  .then((response) =>{
    console.log(response);
  })
}

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