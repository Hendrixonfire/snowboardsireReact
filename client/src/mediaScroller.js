
import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios'
import './App.css';
import MediaElement from './mediaElement';
function MediaScrollerBig(props){
    const [shopItems, setShopItems] = useState([]);
    const getData = async () =>{
        const  { data } = await axios.post("https://snowboardaddictionreact.onrender.com/api/getshopitems",{
        });
        
        // console.log(data);
        setShopItems(data);
       
        
        
       
     }
    
     useEffect(()=>{
        getData();
      
      
       }, [])
//     const [shopItems, setShopItems] = useState([
//     {itemURL: 'https://snowboardaddiction.com/cdn/shop/products/VE_04144-Edit-2019Products_2048px_byVinceEmond_1100x.jpg?v=1670414829',
//      itemDescription: '',
//      itemName:'Tramp Board',
//      itemRating:{
//         stars: 5,
//         count: 679
//      },
//      itemType: '', 
//      itemPriceCents:10747,
//      itemQuantity: 1,
//      isAvailable:true,
//      itemId: 1
//     },
//     {itemURL: 'https://snowboardaddiction.com/cdn/shop/products/VE_04146-Edit-2019Products_2048px_byVinceEmond_1100x.jpg?v=1670414707',
//     itemDescription: '',
//     itemName:'Jib Board',
//     itemRating:{
//        stars: 5,
//        count: 679
//     },
//     itemType: '', 
//     itemPriceCents:10747,
//     itemQuantity: 2,
//     isAvailable:true,
//     itemId: 2
//     },
//     {itemURL: 'https://snowboardaddiction.com/cdn/shop/products/Sideon_Inside_1100x.png?v=1675183384',
//     itemDescription: '',
//     itemName:'Training Bindings',
//     itemRating:{
//        stars: 5,
//        count: 679
//     },
//     itemType: '', 
//     itemPriceCents:10747,
//     itemQuantity: 3,
//     isAvailable:true,
//     itemId: 3
//     },
//     {itemURL: 'https://snowboardaddiction.com/cdn/shop/products/WTP_on_45deg_1100x.png?v=1673981281',
//     itemDescription: '',
//     itemName:'Balance Bar',
//     itemRating:{
//        stars: 5,
//        count: 679
//     },
//     itemType: '', 
//     itemPriceCents:10747,
//     itemQuantity: 4,
//     isAvailable:true,
//     itemId: 4
//     },
//     {itemURL: 'https://snowboardaddiction.com/cdn/shop/products/Layedout_Full_1100x.png?v=1670414813',
//     itemDescription: '',
//     itemName:'Training Mat',
//     itemRating:{
//        stars: 5,
//        count: 679
//     },
//     itemType: '', 
//     itemPriceCents:10747,
//     itemQuantity: 5,
//     isAvailable:true,
//     itemId: 5
//     },

//     {itemURL: 'https://snowboardaddiction.com/cdn/shop/products/Top-Sheet_550x.png?v=1638982107',
//     itemDescription: '',
//     itemType: '', 
//     itemName:'Jump Training Setup',
//     itemRating: {
//         stars: 5,
//         count: 679
//      },
//     itemPriceCents:10747,
//     itemQuantity: 6,
//     isAvailable:true,
//     itemId: 6
//     },

//     {itemURL: 'https://snowboardaddiction.com/cdn/shop/products/VE_04350-Edit-2019Products_2048px_byVinceEmond_1100x.jpg?v=1670414862',
//     itemDescription: '',
//     itemName:'Freestyle Training Setup',
//     itemRating: {
//        stars: 5,
//        count: 679
//     },
//     itemType: '', 
//     itemPriceCents:10747,

//     itemQuantity: 7,
//     isAvailable:true,
//     itemId: 7
//     },

//     {itemURL: 'https://snowboardaddiction.com/cdn/shop/products/FreestyleTrainingSetup_1100x.png?v=1673982178',
//     itemDescription: '',
//     itemName:'Jib Training Setup',
//     itemRating:{
//        stars: 5,
//        count: 679
//     },
//     itemType: '', 
//     itemPriceCents:10747,

//     itemQuantity: 8,
//     isAvailable:true,
//     itemId: 8
//     },

//     {itemURL: 'https://snowboardaddiction.com/cdn/shop/products/JibTrainingSetup_1100x.png?v=1673982033',
//     itemDescription: '',
//     itemName:'Full Jib Package',
//     itemRating:{
//        stars: 5,
//        count: 679
//     },
//     itemType: '', 
//     itemPriceCents:10747,

//     itemQuantity: 9,
//     isAvailable:true,
//     itemId: 9
//     },

//     {itemURL: 'https://snowboardaddiction.com/cdn/shop/products/FullJibPackage_1100x.png?v=1673982097',
//     itemDescription: '',
//     itemName:'Addicted Training Setup',
//     itemRating:{
//        stars: 5,
//        count: 679
//     },
//     itemType: '', 
//     itemPriceCents:10747,
//     itemQuantity: 10,
//     isAvailable:true,
//     itemId: 10
//     }

// ])
  const [mediaScrollerCounter, setMediaScrollerCounter] = useState(0);
  const [itemsToShow, setItemsToShow]= useState([]);
//   const childStateRef = useRef();
//     const getChildState = () =>{
//     const childState = childStateRef.current.getChildCount();
//     console.log(`The child state is:`, childState);
//   }
  let isMobile = useRef(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
      const resize = () => {
          if(window.innerWidth > 720) {
              if(isMobile.current) {
                  isMobile.current = false;
                  setMobile(false);
              }
          } 
          else {
              if(!isMobile.current) {
                  isMobile.current = true;
                  setMobile(true)
              }
          }
       }
      window.addEventListener("resize",  resize);
      
      return () => window.removeEventListener("resize", resize);
  }, [])

 
function getAList(num){
 
 let array = shopItems.filter((item)=>{


        if ((item.itemId >= 1 + (num * 5)) && (item.itemId <= (num + 1) * 5)){
            // console.log(item.itemId);
           return true ;
        } else{
           return false;
        }
       }) 

if (array.length != 0){
    
    setItemsToShow(array);
    // console.log(mediaScrollerCounter);
}
else if(num < 0){

    console.log(num);
    console.log(shopItems.length - 5);
    console.log(shopItems.length / 2);
    const newArr  = shopItems.slice(shopItems.length - 5, shopItems.length);
    console.log(newArr);
    setItemsToShow(newArr);
    setMediaScrollerCounter(getNavIndicatorsNumber(shopItems, 5).length - 1);
    // console.log(mediaScrollerCounter);
 
}
else{
    // console.log("set scroller to 0")
    setMediaScrollerCounter(0);
    // console.log(mediaScrollerCounter);
}
    
     
      
    }

useEffect(()=>{


getAList(mediaScrollerCounter);

},[shopItems, mediaScrollerCounter])


function getNavIndicatorsNumber(arr, num){
    const newArr = [];
    if ((arr.length / num) % 0){
        const newArr = arr.slice(0, arr.length / num)
        return newArr;
    } else {
        const newArr = arr.slice(0, Math.ceil(arr.length / num))
        return newArr;
    }
 
  
}

if (!isMobile.current)
    return(
        <>
     <div className="media-container">
        <div className="media-scroller">
       
            <div className="media-group" >
            <a className="previous" onClick={(e)=> e.preventDefault(setMediaScrollerCounter(mediaScrollerCounter - 1)) }>
          
                    <svg id="next" viewBox="0 0 256 512">
                    <path fill="purple"
                        d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" />
                    </svg>
       
             </a>
            {  
             itemsToShow.map((item)=>
                (
                    <MediaElement  onAddToCartProp={props.onAddToCart}  src={item.itemURL} name={item.itemName} shopId={item._id} ratingCount={item.itemRating.count} ratingStars={item.itemRating.stars} price={item.itemPriceCents} id={item.itemId}/> 
                ))
            }

            
        
       

            <a className="next"  onClick={(e)=> e.preventDefault(setMediaScrollerCounter(mediaScrollerCounter + 1)) }>
            
                <svg id="previous" viewBox="0 0 256 512">
                <path fill="purple"
                            d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
                        </svg>
       
            </a>
            </div>
             
            <div className="navigation-indicators">
              
         {
            getNavIndicatorsNumber(shopItems, 5).map((items, index)=>
            (
                <div key={index} className={(!mediaScrollerCounter && index === 0) ? 'navIndicatorSelected': (mediaScrollerCounter && index === 1)? 'navIndicatorSelected': '' }></div>
            )
            )
            }
            </div>

         </div>
    </div>
 
       
 </>
    )
    else {
        return(
            <>
            <div className="mobileShopContainer">
            {  
                shopItems.map((item)=>
                   (
                       <MediaElement onAddToCartProp={props.onAddToCart} shopId={item._id} src={item.itemURL} name={item.itemName} ratingCount={item.itemRating.count} ratingStars={item.itemRating.stars} price={item.itemPriceCents} id={item.itemId} /> 
                   ))
               }
               </div>
               </>
        )
        }
}

export default MediaScrollerBig;
