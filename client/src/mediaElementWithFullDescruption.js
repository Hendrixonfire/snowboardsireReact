import React, {useEffect, useState, useRef} from 'react';
import Home from "./Home";
import mediaElement from './mediaElement';
import {Link} from 'react-router-dom'
import { formatCurrency } from './formatCurrency';

import './App.css';
import { matchPath, matchRoutes, useParams } from 'react-router-dom';
import axios from 'axios'
function MediaElementWithFullDescription(params){
    const [buttonSelected, setSelectedButton] = useState('Product Details');
    const [shopItems, setShopItems] = useState([]);
    const getData = async () =>{
        const  { data } = await axios.post("http://localhost:4000/api/getshopitems",{
        });
        
        // console.log(data);
        setShopItems(data);
     
        
        
       
     }
    
     useEffect(()=>{
        getData();
      
      
       }, [])
    const { id } = useParams();
 

      const shopItemFull = shopItems.find((b) =>  b._id == id);
      console.log(shopItemFull);
   function handleChangeTab(e){
    setSelectedButton(e.target.value);
   }
    return(
        <>
        <div className="navigationShopItemFullPage">
        <Link to="/">  <img className="amazonLogo" src="/images/SA_Primary_Black_Lettering_CMYK_40795a05-689d-4bb9-95de-a4b1596bfaa0_110x.avif" width="55" height="55"  alt="" /></Link>
      
      </div>
  
      {
        (!shopItemFull) ? '': <>   <div className='fullShopItemContainer' > <div className="shopItemFull" >
        <div className="imageContainerFull">
      
        <img className="shopItemImageFull" src={shopItemFull?.itemURL} />
      
        </div>
        <div className="shopItemInfoContainerFull">
          <div className='shopItemNameAndStars'>
            <div className="product-rating-container-media">
                      <img className="product-rating-stars-media-shop-item"
                        src={`/images/ratings/rating-${shopItemFull?.itemRating.stars * 10}.png`}/>
                      <div className="product-rating-count-media-shop-item link-primary">
                        {shopItemFull?.itemRating.count}
                      </div>
                    </div>
            <h1>{shopItemFull?.itemName}</h1>
        </div>
        <div className='shopItemDescAndPrice'>
            <p>Description: {shopItemFull?.itemDescription}</p>
            <h2>Item Price: {formatCurrency(shopItemFull?.itemPriceCents)}</h2>
         </div>
        </div>
      
    </div>
    </div>
<div className='shopItemInfoSection'>
    <div className='shopItemButtonContainer'>
        <button className='productDetailsButton' style={{textUnderlineOffset: buttonSelected === "Product Details" ? "-25px" : "none", textDecoration: buttonSelected === "Product Details" ? "underline" : "none" }} onClick={event=>handleChangeTab(event,'value')} value={"Product Details"}>
          Product Details
        </button>
        <button className='productSizingButton'style={{textUnderlineOffset: buttonSelected === "Sizing & Specs" ? "-25px" : "none", textDecoration: buttonSelected === "Sizing & Specs" ? "underline" : "none" }} onClick={event=>handleChangeTab(event,'value')} value="Sizing & Specs">
          Sizing & Specs
        </button>
    </div>
    {
      (buttonSelected === "Product Details") ?  <div className='shopItemButtonIntoContainer'><p>{shopItemFull.itemProductDetails}</p></div>  : (shopItemFull?.itemSizingSpecs[0] === null) ? '' :
      <div className='sizingGrid'>
        <div>
          <h2>Sizing</h2>
          <p>{shopItemFull?.itemSizingSpecs[0].sizing}</p>
        </div>
        <img src={shopItemFull?.itemSizingSpecs[0].sizingURL}/>
        <div>
          <h2>Mounting System</h2>
          <p>{shopItemFull?.itemSizingSpecs[0].mountingsystem}</p>
        </div>
        <img src={shopItemFull?.itemSizingSpecs[0].mountingsystemURL}/>
        <div>
          <h2>Materials</h2>
          <p>{shopItemFull?.itemSizingSpecs[0].materials}</p>
        </div>
        <img src={shopItemFull?.itemSizingSpecs[0].materialsURL}/>
        <div>
          <h2>Profile</h2>
          <p>{shopItemFull?.itemSizingSpecs[0].profile}</p>
        </div>
        <img src={shopItemFull?.itemSizingSpecs[0].profileURL}/>
        <div>
          <h2>Smooth Sidewall Construction</h2>
          <p>{shopItemFull?.itemSizingSpecs[0].smoothsidewallconstruction}</p>
        </div>
        <img src={shopItemFull?.itemSizingSpecs[0].smoothsidewallconstructionURL}/>
        <div>
          <h2>Eva High Density Foam</h2>
          <p>{shopItemFull?.itemSizingSpecs[0].evahighdensityfoam}</p>
        </div>
        <img src={shopItemFull?.itemSizingSpecs[0].evahighdensityfoamURL}/>
      </div>
    }
  
    
   
</div>
<div className='shopItemInfoImageGrid'>
  <img className="shopItemGridImageOne" src={shopItemFull?.itemInfoImg} />
  <div className='shopItemGridInfoOne'>{shopItemFull?.itemInfoText}</div>
  <div className='shopItemGridInfoTwo'>{shopItemFull?.itemInfoTextTwo}</div>
  <img className="shopItemGridImageTwo" src={shopItemFull?.itemInfoImgTwo}/>




</div>
   </>
      }
 
      </>
    )
              
              }
export default MediaElementWithFullDescription;