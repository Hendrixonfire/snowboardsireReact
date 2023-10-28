import {Link} from 'react-router-dom';
import React,{useEffect, useState, forwardRef, useImperativeHandle, Select}  from 'react';
import './App.css';
import { motion, AnimatePresence} from "framer-motion";
function MediaElement(props){
    // function showItemDiv(){
      
    //     document.getElementById("selected-item-image-id").src = props.src;
    //     let target = document.getElementById('js-media--card');
    //     let target2 = document.querySelector('.selected-item-grid');
    //     target2.setAttribute('style', 'display:grid');
    //     // target.scrollIntoView();
    //   }
      const getInitialState = () => {
        const value = 1;
        return value;
      }; 
   const selectOptions = [2,3,4,5,6,7,8,9,10];
   const [selectedValue, setSelectedValue] = useState(getInitialState);
   const [show, setShow] = useState(false);
   const variants = {
    showAdd: {
      opacity: 1,
      transition: {
        // delay: 0.3,
        type: "tween",
        duration: .3,
      },
    },
    hideAdd: { opacity: 0,
      transition: {
        // delay: 0.3,
        type: "tween",
        duration: 1,
      }
    },
  } 
    function setAddShow(){
     setShow(prevState=> !prevState);
     setTimeout(()=>{
      console.log("animating");
      setShow(false);
    }, 2000)
    
    }
   

   function getDropValue(e){
    setSelectedValue(e.target.value);
    
    }
    useEffect(()=>{
      // console.log(`selectedValue has changed to ${selectedValue}`)
    },[selectedValue])
    return(
      (!localStorage.getItem("user")) ? 
         
                <div className="media-element" >
                <Link to={`shopitemfull/${props.shopId}`}>
                <img 
                    src={props.src} 
                    alt="" />
                      </Link>
                </div>
                :
                <div className="media-element"  >
                <div className="product-container-media">
                <Link to={`shopitemfull/${props.shopId}`}>
                <div className="product-image-container-media">
                  <img className="product-image-media"
                      src={props.src} />
                  <AnimatePresence>
                      {show && (
                      <motion.div
                      variants={variants}
                      initial="hideAdd"
                      animate="showAdd"
                      exit="hideAdd"
                      className="added-to-cart" >
                        <img src="images/icons/checkmark.png"/>
                        Added
                      </motion.div>
                  
                      )}
                  </AnimatePresence>
                </div>
                </Link>
                <div className='product-desc-container-media'>
                <div className="product-name limit-text-to-2-lines">
                  {props.name}
                </div>
          
                <div className="product-rating-container-media">
                  <img className="product-rating-stars-media"
                    src={`/images/ratings/rating-${props.ratingStars * 10}.png`}/>
                  <div className="product-rating-count-media link-primary">
                    {props.ratingCount}
                  </div>
                </div>
          
                <div className="product-price-media">
                  ${(props.price / 100).toFixed(2)} 
                </div>
          
                <div className="product-quantity-container-media">
                  <select name="media-select" value={selectedValue}  onChange={getDropValue}>
                    {/* // name="quantity-select"
                    // searchable={false}
                    // value={selectedOption}
                    // onChange={handleChange}
                    // options={options} */}
                    <option selected value="1">1</option>
                    {/* <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option> */}
                        {(selectOptions).map(data=>(
              
              <option value={data}>{data}</option>
            
            
            ))}
                    </select>
                </div>
          
                <div className="product-spacer"></div>
           
                <button onClick={e=>{props.onAddToCartProp(e, props.id,selectedValue);setAddShow()}} className="add-to-cart-button button-primary js-add-to-cart"
                data-product-id={`${props.id}`}>
                  Add to Cart
                </button>
              </div>
              </div>
              </div>
          
    
    )


}

export default MediaElement;