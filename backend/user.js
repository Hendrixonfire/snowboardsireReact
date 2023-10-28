const mongoose = require('mongoose');
const user = new mongoose.Schema({
    username: String,
    email: String,
    password:  String,
    avatar: String,
    orders: Array
//     orders: [
//       {
//         allProducts:[
//            {
//               type: mongoose.Schema.Types.itemId,
//               ref: "Shopitems",
//             },
//             {
//               type: Number,
//               default: 1,
//             }],
//        delivery:{
//           date: String,
//           price: Number,

//         },
//       totalprice: Number
      
     
// }]
      
});

module.exports = mongoose.model('User', user)