
import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios'
import './App.css';
import MediaElement from './mediaElement';
function MediaScrollerBig(props){
    const [shopItems, setShopItems] = useState([]);
    const [mediaScrollerCounter, setMediaScrollerCounter] = useState(0);
    const [itemsToShow, setItemsToShow]= useState([]);
    let isMobile = useRef(false);
    const [mobile, setMobile] = useState(false);

    const getData = async () =>{
        const  { data } = await axios.post("https://snowboardaddictionreact.onrender.com/api/getshopitems",{
            //https://snowboardaddictionreact.onrender.com
        });
        setShopItems(data); 
     }
    
    useEffect(()=>{
        getData();
    }, [])

    useEffect(() => {
        const resize = () => {
        if (window.innerWidth > 720 && isMobile.current) {
            isMobile.current = false;
            setMobile(false);
        } else if (window.innerWidth <= 720 && !isMobile.current) {
            isMobile.current = true;
            setMobile(true);
        }
        };
        window.addEventListener("resize", resize);
        resize();

        return () => {
        window.removeEventListener("resize", resize);
        };
    }, []);

    useEffect(()=>{
        getAList(mediaScrollerCounter);
    },[shopItems, mediaScrollerCounter])
    


    
    function getAList(num){
        let array = shopItems.filter((item)=>{
                    if ((item.itemId >= 1 + (num * 5)) && (item.itemId <= (num + 1) * 5)){
                
                    return true ;
                    } else{
                    return false;
                    }
                }) 
            if (array.length != 0){
                
                setItemsToShow(array);

            }
            else if(num < 0){
                console.log(num);
                console.log(shopItems.length - 5);
                console.log(shopItems.length / 2);
                const newArr  = shopItems.slice(shopItems.length - 5, shopItems.length);
                console.log(newArr);
                setItemsToShow(newArr);
                setMediaScrollerCounter(getNavIndicatorsNumber(shopItems, 5).length - 1);
            }
            else{

                setMediaScrollerCounter(0);

            }
        
    }



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

if (!mobile)
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
            { itemsToShow.map((item)=>
                (
                    <MediaElement  
                     onAddToCartProp={props.onAddToCart}
                     src={item.itemURL}
                     name={item.itemName}
                     shopId={item._id}
                     ratingCount={item.itemRating.count}
                     ratingStars={item.itemRating.stars}
                     price={item.itemPriceCents}
                     id={item.itemId}/> 
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
            
         {getNavIndicatorsNumber(shopItems, 5).map((items, index)=>
            (
                <div key={index}
                 className={(!mediaScrollerCounter && index === 0) ? 'navIndicatorSelected': (mediaScrollerCounter && index === 1)? 'navIndicatorSelected': '' }>
                 </div>
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
            {shopItems.map((item)=>
                   (
                       <MediaElement 
                       onAddToCartProp={props.onAddToCart}
                       shopId={item._id}
                       src={item.itemURL}
                       name={item.itemName}
                       ratingCount={item.itemRating.count}
                       ratingStars={item.itemRating.stars}
                       price={item.itemPriceCents}
                       id={item.itemId} /> 
                   ))
               }
               </div>
               </>
        )
        }
}

export default MediaScrollerBig;
