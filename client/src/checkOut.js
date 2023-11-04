import React, {useEffect, useState} from 'react';
import { useLocation,Link, Navigate } from 'react-router-dom'
import '../src/dist/checkout.css'
import {formatCurrency, formatRound} from './formatCurrency';
import axios from 'axios'
import AuthService from './services/auth.service';
function CheckOutReactPage(){
    const  cartUsername  = JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''));;
    const [shopItems, setShopItems] = useState([]);
    const [cartQuant, setCartQuant] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [shipping, setShipping] = useState(0);
    let [cart, setCart] = useState([])
    const [isRemoved, setIsRemoved]= useState(false);

    async function getData() {
        try{
        const {data} = await axios.post("http://localhost:4000/api/getshopitems",{
          //https://snowboardaddictionreact.onrender.com
          })
          
          console.log(data);
          setShopItems(data);
            
            console.log(`currenct totalPrice is ${totalPrice}`)
          
        

        } catch(error) {

          console.error("The Promise is rejected!", error);
      
        } 
                      
    }
    





      let matchingItems = [];

      function getMatchingArray() {

        // console.log(cart);
        cart.forEach((cartElement) => {

          // console.log(cartElement);
        
          // const productId = cartElement.productId;
            shopItems.forEach((shopItem) => {
        
              if (shopItem.itemId === cartElement.productId) {
              
                matchingItems.push({...shopItem, cartQuant: cartElement.quantity});
                
              }
          
            })
        
     
          })
          console.log(`matchingitem is getMatchingArray ${matchingItems}`);
      
          return matchingItems;   
        
        }


        function getOrderSummary(){
          console.log("getting order summery");
          console.log(shopItems);
          // console.log(`matchingitem is getOrderSumm ${matchingItems}`);
          cart.forEach((cartElement) => {

            // console.log(cartElement);
          
            // const productId = cartElement.productId;
              shopItems.forEach((shopItem) => {
          
                if (shopItem.itemId === cartElement.productId) {
                
                setTotalPrice(prevState=>formatRound(prevState + (cartElement.quantity * formatCurrency(shopItem.itemPriceCents))))
                  
                }
            
              })
          
        ;
            })
          console.log(`currenct totalPrice is ${totalPrice}`)
        }

        function setDeliveryOption(event){
        
          setShipping(event.target.value)
        }


        function updateOrderSummary(){
          console.log("updating order summery");
          // console.log(`matchingitem is getOrderSumm ${matchingItems}`);
          cart.forEach((cartElement) => {

            // console.log(cartElement);
          
            // const productId = cartElement.productId;
              shopItems.forEach((shopItem) => {
          
                if (shopItem.itemId === cartElement.productId) {
                
                setTotalPrice(prevState=>formatRound(prevState - (cartElement.quantity * formatCurrency(shopItem.itemPriceCents))))
                  
                }
            
              })
          
        
            })
          console.log(`currenct totalPrice is ${totalPrice}`)


        }

        function saveToStorage(){
          localStorage.setItem('cart', JSON.stringify(cart));
        }

                
        function removeFromCart(productId){
            const newCart = [];
            console.log(`cart items before ${cart.length}`)
            cart.forEach((cartItem)=>{
              // console.log(cartItem)
              if(cartItem.productId != productId){
                newCart.push(cartItem);
              }
            })
            cart = newCart;
            saveToStorage();
            setIsRemoved(prevState=> !prevState);
            console.log(`cart items after ${cart.length}`)
            setCartQuant(prev=>prev-1)
        
            // console.log(`Checkout cart: ${cart}`);
        }

        const handleRemoveCartItem = (e, productId)=> {
            e.preventDefault()
            
            removeFromCart(productId);
        }

        const handleSendOrder = (event, cart, shipping, OrderPrice) =>{
            console.log(`${JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))} thanks for joining placing the order!`);
            const param1 = [];
            param1.push({cart,"DeliveryPrice":shipping,"TotalPrice":OrderPrice});
            AuthService.placeOrder(cartUsername, param1).then(
              ()  => {
                console.log(`${cartUsername} succesfully placed an order`);
                localStorage.removeItem("cart");
              
                setCart([]);
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


        useEffect(()=>{
          setCart(JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [] );
          updateOrderSummary()
        },[isRemoved])


        useEffect(()=>{
          getOrderSummary()
        },[shopItems.length])


        useEffect(()=>{
          setCartQuant(cart.length)
          getMatchingArray()
        
          getOrderSummary()
        },[cart.length]);

        useEffect(()=>{
          getData();
          
        }, [])


        let OrderPrice = ((totalPrice + Number(shipping)) + (((totalPrice + Number(shipping))*10)/100));




  if( !localStorage.getItem('cart'))
      return(
    <>
        <div class="checkout-header">
        <div class="header-content">
          <div class="checkout-header-left-section">
            <a href="/">
              <img class="amazon-logo" src="images/SA_Primary_Black_Lettering_CMYK_40795a05-689d-4bb9-95de-a4b1596bfaa0_110x.avif"/>
              <img class="amazon-mobile-logo" src="images/SA_Primary_Black_Lettering_CMYK_40795a05-689d-4bb9-95de-a4b1596bfaa0_110x.avif"/>
            </a>
          </div>
          </div>
          </div>
          <div className='messageForPlacedOrder'>
            <h1>Thanks for placing the order! You can check you latest order on your private page!</h1>
            <Link className='userPageLink' prefetch={false} reloadDocument id="glow-on-hover-user" to={`/${JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))}`}> Go to private page! </Link>
          </div>
          </>
    )
  else {
        return(
        
            
          <>
          <div class="checkout-header">
          <div class="header-content">
            <div class="checkout-header-left-section">
              <a href="/">
                <img class="amazon-logo" src="images/SA_Primary_Black_Lettering_CMYK_40795a05-689d-4bb9-95de-a4b1596bfaa0_110x.avif"/>
                <img class="amazon-mobile-logo" src="images/SA_Primary_Black_Lettering_CMYK_40795a05-689d-4bb9-95de-a4b1596bfaa0_110x.avif"/>
              </a>
            </div>

            <div class="checkout-header-middle-section">
              Checkout (<a class="return-to-home-link"
                href="/"> {cartQuant} items</a>)
            </div>

            <div class="checkout-header-right-section">
              <img src="images/icons/checkout-lock-icon.png"/>
            </div>
          </div>
        </div>

        <div class="main">
          <div class="page-title">Review your order</div>

          <div class="checkout-grid">
          <div class="order-summary js-order-summary">
              { 
          
          getMatchingArray().map(items => 
          
                (
                  <div class={`cart-item-container
                  js-cart-item-container-${items.itemId}`}>
                  <div class="delivery-date">
                    Delivery date: Tuesday, June 21
                  </div>

                  <div class="cart-item-details-grid">
                    <img class="product-image"
                      src={items.itemURL}/>

                    <div class="cart-item-details">
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
                        <span class="update-quantity-link link-primary">
                          Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" onClick={e=>handleRemoveCartItem(e, items.itemId)} >
                          Delete
                        </span>
                      </div>
                    </div>

                    <div class="delivery-options" onChange={event=>setDeliveryOption(event)}>
                      <div class="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      <div class="delivery-option">
                        <input type="radio" 
                          class="delivery-option-input"
                          value="0"
                          // name={`delivery-option-${items.itemId}`}/>
                          name="delivery-option-name" />
                        <div>
                          <div class="delivery-option-date">
                            Tuesday, June 21
                          </div>
                          <div class="delivery-option-price">
                            FREE Shipping
                          </div>
                        </div>
                      </div>
                      <div class="delivery-option">
                        <input type="radio"
                          class="delivery-option-input"
                          value="4.99"
                          // name={`delivery-option-${items.itemId}`}/>
                          name="delivery-option-name" />
                        <div>
                          <div class="delivery-option-date">
                            Wednesday, June 15
                          </div>
                          <div class="delivery-option-price">
                            $4.99 - Shipping
                          </div>
                        </div>
                      </div>
                      <div class="delivery-option">
                        <input type="radio"
                          class="delivery-option-input"
                          value="9.99"
                          // name={`delivery-option-${items.itemId}`}/>
                          name="delivery-option-name" />
                        <div>
                          <div class="delivery-option-date">
                            Monday, June 13
                          </div>
                          <div class="delivery-option-price">
                            $9.99 - Shipping
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                                  
                )
                    
      )}
      </div>
          <div class="payment-summary">
            <div class="payment-summary-title">
              Order Summary
            </div>

            <div class="payment-summary-row">
              <div>Items ({cartQuant}):</div>
              <div class="payment-summary-money">({(totalPrice.toFixed(2))})</div>
            </div>

            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">{shipping}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">({((totalPrice + Number(shipping)).toFixed(2))})</div>
            </div>

            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">({((((totalPrice + Number(shipping))*10)/100).toFixed(2))})</div>
            </div>

            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">({(((totalPrice + Number(shipping)) + (((totalPrice + Number(shipping))*10)/100)).toFixed(2))})</div>
            </div>

            <button class="place-order-button button-primary"  onClick={event=>handleSendOrder(event, cart, shipping, OrderPrice  )}>
              Place your order
            </button>
          </div>
        </div>
      </div>
                    
</>

)
}

                      }
export default CheckOutReactPage;