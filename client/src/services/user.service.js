import axios from "axios";

const API_URL = "http://localhost:3000/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};
const sendReview = (param1, param2) => {
return axios.post('api/review',{
  content: param1,
  username:  param2


})
.then((response) =>{
  console.log(response);
})
}

// const sendReview = (param1, param2) => {
 
//   axios({
//     method: 'POST',
//     data:{
//       content: param1,
//       username: param2
//     },
//     url: "http://localhost:4000/api/review"
//   })
//   .then((response)=>{
 
   
    
      
//        console.log(response);      
    
     
//    });

// }
const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  sendReview
}



export default UserService;