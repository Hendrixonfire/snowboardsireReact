import React, {useEffect, useState} from 'react';
import { useLocation,useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './App.css';
import AuthService from './services/auth.service';
import UserService from './services/user.service';
import {formatCurrency, formatRound} from './formatCurrency';
function UserPageReact(){

  const  lessonUsername  = JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''));
  const [data, setSessions] = useState([]);
  const [orderData, setOrderData] = useState([]);
  // const [dataReviews, setReview] = useState([]);
  const [isLeft, setIsLeft] = useState(false);
  const [userReview, setUserReview] = useState('')
  const [avatar, setAvatar] = useState("");
  const [userReviewFlag, setUserReviewState] = useState(null)
  const [shopItems, setShopItems] = useState([]);
  async function getData() {
      try{
       const {data} = await axios.post("http://localhost:4000/api/getshopitems",{
        })
        
        console.log(data);
        setShopItems(data);
          
     
        
      
  
      } catch(error) {
  
        console.error("The Promise is rejected!", error);
    
      } 
      
         
         
          
          // console.log(data);
          // setShopItems(data);
          // getOrderSummary();
           
         
  }
  let matchingItems = [];

  function getMatchingArray() {
  
    const cartItems = orderData["cart"];
    console.log(cartItems)
   cartItems.forEach((cartElement) => {
  
      console.log(cartElement);
    
      const productId = cartElement.productId;
        shopItems.forEach((shopItem) => {
    
          if (shopItem.itemId === cartElement.productId) {
           
            matchingItems.push({...shopItem, cartQuant: cartElement.quantity});
             
          }
       
        })
    
   ;
      })
      console.log(`matchingitem is getMatchingArray ${matchingItems}`);
   
      return matchingItems;   
    
    }

 const getJoinedData = async () =>{
    const  { data } = await axios.post("http://localhost:4000/api/joinedSessions",{
      username: lessonUsername
    });
    
  
    setSessions(data);

 }

 const getReviewData = async () =>{
  const  { data } = await axios.post("http://localhost:4000/api/userReviews",{
    username: lessonUsername
  });
  
  // console.log(data);
  setUserReviewState(data);
}

useEffect(()=>{
  getReviewData();
  
  getData();
 }, [])

// useEffect(()=>{
//   getMatchingArray()
// },[])


 useEffect(()=>{
  getJoinedData();

 }, [isLeft])

 const getInitialState = () => {
  const value = '';
  return value;
}; 
const getUser = async ()=>{
  const  { data } = await axios.post(`http://localhost:4000/api/member`,{
    username: lessonUsername
  })
  // console.log(data);
  setAvatar(data.avatar);
}

useEffect(() => {
  getUser();

}, []);
// useEffect(()=>{
//   getMatchingArray();
// },[orderData.length])

const getLastOrder = async ()=>{
  const  { data } = await axios.post('/api/getlastorder',{
    username: lessonUsername
  })
  setOrderData(data.orders[data.orders.length - 1][0]);
  console.log("set last order state")
  // console.log(data.orders[data.orders.length - 1][0].TotalPrice);
  // console.log(data.orders[data.orders.length - 1][0].DeliveryPrice);
  // data.orders[data.orders.length - 1][0].cart.forEach(element => {
  //   console.log(`cart has ${element.productId}`)
  // });
}
useEffect(() => {
  getLastOrder();
  console.log("getting last order useEff")
}, []);

const handleLeaveLesson = (event, param1, param2) => {
     
  console.log(`${JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))} thanks for joining ${param2} lesson on: ${param1}`);
  AuthService.leaveLesson(lessonUsername,  param1, param2).then(
    ()  => {
      console.log('User left the session');
      setIsLeft(prev=>!prev);
    },
    
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            console.log(resMessage);
        }
  )
}

const handleSendReview = (event, param1, param2) => {
     
  UserService.sendReview(param1, param2).then(
    ()  => {
      console.log('User left a review');
      setUserReviewState(prev=>!prev);
    },
    
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            console.log(resMessage);
        }
  )
}

    return(
      <div className="UserPageContainer">
            <div className="navigationUserPage">
              <Link to="/">  <img className="logoRegister" src="/images/SA_Primary_Black_Lettering_CMYK_40795a05-689d-4bb9-95de-a4b1596bfaa0_110x.avif" width="55" height="55"  alt="" /></Link>
            
            </div>
            <div className='userInfoContainer'>
                <div className="userMainInfoContainer">
                  <div className='userNameAndAvatarContainer'>
                    <img
                    src={`http://localhost:4000${avatar}`}
                    className="avatar"
                    alt="logo"
                  />
                  <h3 className='userMainInfoTitle'>{JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))}</h3> 
                      <Link className="editProfileLink" to={`/edit/${lessonUsername}`}>
                    (Edit profile)
                  </Link>
                  </div>
                  <div className='reviewContainer'>
                    { ( userReviewFlag === null) ? <><span>....Loading</span></>: ( userReviewFlag) ? <><div className="postReviewText"><span>Thank you for leaving a review.</span></div></> : (!userReviewFlag) ? <> <div className="userReviewInput">
                              <textarea className="userReviewInputText" type="text" id="review" name="review" required  onChange={e => setUserReview(e.target.value)}/>
                              <label>Review</label>
                        </div>   
                        <button type="submit" className="btnReview" onClick={event=>handleSendReview(event, userReview, lessonUsername)}>Send a Review</button> </> : ''}
                  </div>
                  <div>
                  <div class="cart-item-details-grid-container-user-page">
                      { 
                      (orderData.length != 0) ?
                        getMatchingArray().map(items => 
                      
                          (
                           
                       
                            <div class="cart-item-details-grid-user-page">
                              <img class="product-image-user-page"
                                src={items.itemURL}/>
                
                              <div class="cart-item-details-user-page">
                                <div class="product-name">
                                  {items.itemName}
                                </div>
                                <div class="product-price">
                                  {formatCurrency(items.itemPriceCents)}
                                </div>
                                <div class="product-quantity">
                                  <span>
                                    Quantity: <span class="quantity-label">{items.cartQuant}</span>
                                  </span>
                                </div>
                              </div>
                             </div>
                            
                          )) : <div>No data</div>
                      
                      }
                         </div>        
                      <div class="payment-summary-user-page">
                              <div class="payment-summary-title">
                                Latest Order Summary:
                      </div>

                      <div class="payment-summary-row">
                        <div>Items: {orderData.cart?.length}</div>
                      </div>

                      <div class="payment-summary-row">
                        <div>Shipping &amp; handling: {(orderData?.DeliveryPrice)}</div>
                   
                      </div>

                      <div class="payment-summary-row">
                        <div>Tax: 10%</div>
                     
                      </div>
                    

                      <div class="payment-summary-row total-row">
                        <div>Order total:</div>
                        <div class="payment-summary-money">{formatCurrency((orderData?.TotalPrice) * 100)} (includes 10% tax)</div>
                      </div>

                    </div>

                  </div>


                </div>
                <div className="userLessonsContainer">
                  <h3 className='userSessionsTitle'>Joined sessions</h3>
                  <ol className='joinedSessionsList'>
                    { data.map((sessions, index)=>

                          (         <>
                          <li>
                            <div className="lessonType" key={index} value={sessions.lessonType}> {sessions.lessonType}</div> 
                            <div className="lessonDate" key={index}  value={sessions.lessonDate}> {sessions.lessonDate}</div> 
                            <div className="lessonDesciption" key={index}  value={sessions.lessonDescription}> {sessions.lessonDescription} <button className="sessionLeaveButton" onClick={event=> handleLeaveLesson(event, sessions.lessonDate, sessions.lessonType)}>Leave the session</button> </div>
                            </li>
                            </>
                          ))

                          }
                   
                  </ol>
                </div>
            </div>          

            
              
            </div>
          
                  
                
   
    )


}

export default  UserPageReact;