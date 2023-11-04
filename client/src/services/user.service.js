import axios from "axios";


const sendReview = (param1, param2) => {
return axios.post('https://snowboardaddictionreact.onrender.com/api/review',{
  content: param1,
  username:  param2


})
.then((response) =>{
  console.log(response);
})
}


const UserService = {
  sendReview
}



export default UserService;
