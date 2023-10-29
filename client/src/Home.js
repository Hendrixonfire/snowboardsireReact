import React, { useEffect, useState, useRef} from 'react';
import './App.css';
import {Link, useLocation,useNavigate,Router} from 'react-router-dom'
import TestimonialCard from './testimonialCard'
import axios from 'axios'
import { generator, getMultipleRandom } from './randomGenerator';
import { motion, useCycle } from "framer-motion";
import MediaScrollerBig from './mediaScroller';
import AuthService from './services/auth.service';

// import { Helmet } from "react-helmet-async"

function Home() {
  const [mobile, setMobile] = useState(false);
  const isMobile = useRef(false);
  const initialCart = JSON.parse(localStorage?.getItem('cart')) ?  JSON.parse(localStorage?.getItem('cart')) : [];
  const [cart, setCart] = useState(initialCart);
  // const [isOpen, setIsOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cards, setCard] = useState([
    {cardUserName: 'Daniel Clifford',
     cardPosition: 'Gold Medal Olimpian',
     cardDescriptionOne: 'nowboard Addiction helps snowboarders get to the next level with their sick boards.', 
     cardDescriptionTwo:"Trampolines help me with my air awareness and help me break down tricks. Whether it's a new trick, or a trick I'm already doing on snow, it helps create the perfect replication of being in the air",
     cardImage: "images/image-daniel.jpg",
     cardId: 1,
   
    },
    {cardUserName: 'Jonathan Walters',
     cardPosition: 'Snowboard Prodigy & Team Rider',
     cardDescriptionOne: 'The team was very supportive and kept me motivated', 
     cardDescriptionTwo:"When Gabe started riding park he was quick to get sendy on jumps but rails scared him. After getting a training board setup Gabe started practicing at home and taking the confidence he gained there to the park and sticking it on jib features first go",
     cardImage: "images/image-jonathan.jpg",
     cardId: 2,
   
    },
    {cardUserName: 'Jeanette Harmon',
     cardPosition: 'Snowboard Addiction Customer',
     cardDescriptionOne: 'An overall wonderful and rewarding experience', 
     cardDescriptionTwo:"I came across Snowboard Addiction in 2008 I was brand new to the sport & knew nothing. Everything I have learned since then is on the foundation of your tutorials. Each year I set new goals and thanks to SA I know exactly how to achieve them",
     cardImage: "images/image-jeanette.jpg",
     cardId: 3,
   
    },
    {cardUserName: 'Patrick Abrams',
     cardPosition: 'Olimpic   Coach',
     cardDescriptionOne: '  Awesome teaching support from TAs who did the bootcamp themselves. Getting guidance from them and learning from their experiences was easy.', 
     cardDescriptionTwo:"The boards are great! Really durable... The sky is the limit with these boards. You can use them on a trampoline to practice your grabs... It opens your mind on rotation.",
     cardImage: "images/image-patrick.jpg",
     cardId: 4,
   
    },
    {cardUserName: 'Kira Whittle',
    cardPosition: 'FWT  Competitor',
    cardDescriptionOne: 'Such a life-changing experience. Highly recommended!', 
    cardDescriptionTwo:" The Jib Board & Balance Bar help me keep my tricks on lock throughout the season, at home and over the summer months, with the plus of getting a bit of a winter vibe ",
    cardImage: "/images/image-kira.jpg",
    cardId: 5,
   },
    {cardUserName: 'Jeanette Harmon 2',
    cardPosition: 'Snowboard Addiction Customer',
    cardDescriptionOne: 'An overall wonderful and rewarding experience', 
    cardDescriptionTwo:"I came across Snowboard Addiction in 2008 I was brand new to the sport & knew nothing. Everything I have learned since then is on the foundation of your tutorials. Each year I set new goals and thanks to SA I know exactly how to achieve them",
    cardImage: "images/image-jeanette.jpg",
    cardId: 6,
  
    },
    {cardUserName: 'Patrick Abrams 2',
    cardPosition: 'Olimpic   Coach',
    cardDescriptionOne: '  Awesome teaching support from TAs who did the bootcamp themselves. Getting guidance from them and learning from their experiences was easy.', 
    cardDescriptionTwo:"The boards are great! Really durable... The sky is the limit with these boards. You can use them on a trampoline to practice your grabs... It opens your mind on rotation.",
    cardImage: "images/image-patrick.jpg",
    cardId: 7,
  
    },
    {cardUserName: 'Jonathan Walters 2',
    cardPosition: 'Snowboard Prodigy & Team Rider',
    cardDescriptionOne: 'The team was very supportive and kept me motivated', 
    cardDescriptionTwo:"When Gabe started riding park he was quick to get sendy on jumps but rails scared him. After getting a training board setup Gabe started practicing at home and taking the confidence he gained there to the park and sticking it on jib features first go",
    cardImage: "images/image-jonathan.jpg",
    cardId: 8,
  
   }
   
  ])

  function saveToStorage(){
    // console.log('cart saved');
    // console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

// const [isLogged, setIsLogged] = useState(false);


  
//   const location = useLocation();
//   useEffect(()=>{
//     setIsLogged((prev) => !prev)
//   },[location.state?.logged])
  //console.log(isLogged);
  
  //console.log(location.state)
  // // let dataUser = location.state; // Read values passed on state
  // useEffect(() => {
  //  setIsLogged(location.state?.logged);
  // // console.log(`Logged is: ${isLogged} after redirect`);
  // }, [location.state?.logged]);
  

  // let navigate = useNavigate(); 
  //   const routeChange = () =>{ 
  //     let path = `/`; 
  //     dataUser ='';
  //     navigate(path, { state: { user: '', logged:false} });
  //   }
 
  // const logout = () => {
  //   axios({
  //     method: 'POST',
  //     withCredentials: true,
  //     url: "http://localhost:4000/logout?_method=DELETE"
  //   })
  //   .then((res)=>{
  //       if (res.status === 200) {
          
  //         routeChange();
  //       } else{
  //        console.log(res);
  //       }
  //    });

  // }

  // const childStateRef = useRef();
  // const getChildState = () =>{
  //   const childState = childStateRef.current.getChildCount();
  //   console.log(`The child state is:`, childState);
  // }
  const handleAddToCart = (e, id, selectedValue) => {
    e.preventDefault()
 
    let matchingItem;

    cart.forEach(item => {
      if (id === item.productId) {
        matchingItem = item;
        console.log("matching item");
      }
    });

    if (matchingItem && (selectedValue === 1)) {
      console.log("matching item 2");
      // return {...matchingItem, quantity: matchingItem.quantity + 1 }
      matchingItem.quantity += 1;
      // setCart([...cart])
      saveToStorage();
    }
    else if (matchingItem && (selectedValue != 1)){
      matchingItem.quantity += Number(selectedValue);
      // setCart([...cart])
      saveToStorage();
    } else if (selectedValue != 1) {
      cart.push({
        productId: id,
        quantity: Number(selectedValue)
      });
    } else {
      cart.push({
        productId: id,
        quantity: 1
      });
    }
  
      // setCart([...cart, {
      //   productId: id,
      //   quantity: 1
   
    
      // }]);
      console.log(`added  product to card if no local`);
      setCartQuantity(cartQuantity + 1)
      saveToStorage();

}

useEffect(()=>{
  saveToStorage();
  
},[])
// useEffect(()=>{

//   setCart(JSON.parse(localStorage.getItem('cart'))) //запрос axios в базу.(db.cart.collection)

// }, [localStorage.getItem('cart')])
// const openCart=()=>{
//   setIsOpen(true);
// }
// const closeCart=()=>{
//   setIsOpen(false);
// }
//  useEffect(()=>{
//   setCartQuantity(cartQuantity);
//  },[handleAddToCart])

  useEffect(() => {
    let snowboarder = document.getElementById('snowboardertwo');
   
      
    window.addEventListener('scroll',function(){
      let value = window.scrollY;
      snowboarder.style.left = value + 'px';
      snowboarder.style.bottom = -(value)*0.4 + 'px';
  });
    
    return () => {
      window.removeEventListener('scroll', function(){
        let value = window.scrollY;
        snowboarder.style.left = value + 'px';
        snowboarder.style.bottom = -(value)*0.4 + 'px';
    });
  }}, []);
  
  function toggleAccordion(panelToActivate) {
    const  buttons  = panelToActivate.parentElement.querySelectorAll("button");
    const contents  = panelToActivate.parentElement.querySelectorAll(".accordion-content");

   
    
    buttons.forEach((button)  =>  {
        button.setAttribute("aria-expanded", false);
    });

    contents.forEach((content)  =>  {
        content.setAttribute('aria-hidden', true);
    });

    panelToActivate
        .querySelector('button')
        .setAttribute("aria-expanded", true);

    panelToActivate
        .querySelector('.accordion-content')
        .setAttribute('aria-hidden', false);
}
  useEffect(() => {
    if (localStorage.getItem("user")){
      const accordion =  document.querySelector(".accordion");
      accordion.addEventListener('click',  (e) => {
      const activePanel = e.target.closest(".accordion-panel");
      
      if(!activePanel) 
       return;
      toggleAccordion(activePanel);
      
      });
    } else {
      return;
    }
  
  
    
    // return () => {
    //     accordion.removeEventListener('click',  (e) => {
    //     const activePanel = e.target.closest(".accordion-panel");
    //   });
  }, []);

  const randomArrayCardStyle = generator([1,2,3,4]);



  // const sendReview = () => {
 
  //     axios({
  //       method: 'POST',
  //       data:{
  //         content: userReview,
  //         username: dataUser.user
  //       },
  //       url: "http://localhost:4000/review"
  //     })
  //     .then((res)=>{
     
  //         if (res) {
  //          setUserReviewState(true);
  //          console.log(userReviewState);
  //          console.log(res);      
        
  //         } else {
  //          alert('failed to send a review')
  //         }
        
         
          
  //      });
  
  //   }
// function removeItem(){
//   document.getElementById('selected-item-button-grid') 
//   .addEventListener("click", function(){
//    let target2 = document.querySelector('.selected-item-grid');
//    target2.setAttribute('style', 'display:none');

// })
// }

 let navigate = useNavigate(); 
const handleLogout = () => {
    AuthService.logout().then(
      () => {
        console.log("User logged out")
        navigate("/");
        // window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

   
      }
    );
 
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 260px 38px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 260px 38px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const variants = {
open: {
  opacity: 1,
  transition: { staggerChildren: 0.07, delayChildren: 0.2 },
},
closed: {
  opacity: 0,
  transition: { staggerChildren: 0.05, staggerDirection: -1 },
},
};

const livariants = {
open: {
  y: 0,
  opacity: 1,
  transition: {
    y: { stiffness: 1000, velocity: -100 },
  },
},
closed: {
  y: 50,
  opacity: 0,
  transition: {
    y: { stiffness: 1000 },
  },
},
};
const [isOpen, toggleOpen] = useCycle(false, true);
const [isDisplayNone, setIsDisplayNone] = useState(false);
React.useEffect(() => {
  let timeout;
  if (!isOpen) {
    timeout = setTimeout(() => {
      setIsDisplayNone(true);
    }, 1000);
  } else {
    setIsDisplayNone(false);
  }
  return () => clearTimeout(timeout);
}, [isOpen]);

useEffect(() => {
  const resize = () => {
    if (window.innerWidth < 650 && isMobile.current) {
      isMobile.current = false;
      setMobile(false);
    } else if (window.innerWidth >= 720 && !isMobile.current) {
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



const Path = (props) => (
<motion.path
  fill="transparent"
  strokeWidth="5"
  stroke="hsl(276, 100%, 50%)"
  strokeLinecap="round"
  {...props}
/>
);
  /*
  useEffect(()=>{

  },[isLogged])
  */
  /*
    useEffect(() => {
        const script = document.createElement('script');
      
        script.src = "./logic/new2.js";
        script.async = true;
      
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
      }, []);
   
    */


// useEffect(()=>{
//   checkIfCartExists();
// },[])


      return (
        
      //   <>
      //   <Helmet>
      //   <script
       
      //     src="./logic/new2.js"
      //     type="text/javascript"
      //     defer
      //   ></script>
      // </Helmet>
        <div>
      
       
            <main>
              <header className="loginHeader">
              {/* <ShoppingCartReact handleCartClode={closeCart}/>  */}
                <nav className="navigation">
                  <img className="logo" src="images/SA_Primary_Black_Lettering_CMYK_40795a05-689d-4bb9-95de-a4b1596bfaa0_110x.avif" width="55" height="55"  alt="" />
          
          {(!mobile && localStorage.getItem("user") && localStorage.getItem("cart")) ? (
            <>
              <motion.nav
              initial={false}
              animate={isOpen ? "open" : "closed"}
              className="nav-mobile"
              >
              <motion.div className="background" variants={sidebar} >
              <motion.ul
                variants={variants}
                className="sidebar"
                // style={{
                //   zIndex: isOpen ? 4 : null,
                //   display: isDisplayNone ? "none" : null,
                // }}
              >
                <motion.div className="list-item" variants={livariants}>
               
           
           <Link class="cart-link header-link" to="/Checkout"  >
           <img class="cart-icon" src="images/icons/cart-icon.png"/>
           <div class="cart-quantity js-cart-quantity">{JSON.parse(localStorage.getItem("cart")).length}</div>
           <div class="cart-text">Cart</div>
           </Link> 
 
           <h4 className="userGreeting"> Hi <Link className='userPageLink' prefetch={false} reloadDocument id="glow-on-hover-user" to={`/${JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))}`}> {JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))} </Link> </h4>   <button class="logOutButton" type="submit" id="glow-on-hover" onClick={handleLogout}>Logout</button>
         
           
         
                </motion.div>
            
              
             
                
              
                
              </motion.ul>
              </motion.div>
             
              <button className="sidebar-btn" onClick={toggleOpen}>
                <svg width="23" height="23" viewBox="0 0 23 23" className='burgerMenuBtn'>
                  <Path
                    variants={{
                      closed: { d: "M 2 2.5 L 20 2.5" },
                      open: { d: "M 3 16.5 L 17 2.5" },
                    }}
                  />
                  <Path
                    d="M 2 9.423 L 20 9.423"
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 },
                    }}
                    transition={{ duration: 0.1 }}
                  />
                  <Path
                    variants={{
                      closed: { d: "M 2 16.346 L 20 16.346" },
                      open: { d: "M 3 2.5 L 17 16.346" },
                    }}
                  />
                </svg>
              </button>
              </motion.nav>
              </>

          )
          
         : (localStorage.getItem("user") && localStorage.getItem("cart"))  ? <div class="navUserLogout">
           
          <Link class="cart-link header-link" to="/Checkout"  >
          <img class="cart-icon" src="images/icons/cart-icon.png"/>
          <div class="cart-quantity js-cart-quantity">{JSON.parse(localStorage.getItem("cart")).length}</div>
          <div class="cart-text">Cart</div>
          </Link> 

          <h4 className="userGreeting"> Hi <Link className='userPageLink' prefetch={false} reloadDocument id="glow-on-hover-user" to={`/${JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))}`}> {JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))} </Link> </h4>   <button class="logOutButton" type="submit" id="glow-on-hover" onClick={handleLogout}>Logout</button>
        
          
          </div>  : (localStorage.getItem("user")) ? <><div class="navUserLogout"><h4 className="userGreeting"> Hi <Link className='userPageLink' prefetch={false} reloadDocument id="glow-on-hover-user" to={`/${JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))}`}> {JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))} </Link> </h4>   <button class="logOutButton" type="submit" id="glow-on-hover" onClick={handleLogout}>Logout</button></div></>
          :
          ( <Link className="buttonLogin" to="Login" >
              Login
            </Link>) 
     

              
             
          }
               
             
                     
      
                </nav>
        
         
              </header>
                <section className="section1">
                  <div className="container">
                    <div className={"feature-grid-container grid grid--columns"}>
                      <div className="feature-grid-text">
                        <h2 className="fs-700 uppercase chonbury"> LET'S GO </h2>
                        <span className="text-primary fs-700">SNOWBOARDING</span>
                      <div className="skiresortbox">
                        <span className="mac-book-air1-text08 fs-600 kanit">WINTER SKI RESORT</span>
                      </div>
                     <span className="mac-book-air1-text06"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                         enim ad minim veniam.</span>
                         {/* {
                          (isLogged && userReviewState ) ? <><div className="postReviewText"><span>Thank you for leaving a review </span></div></> : (isLogged && !userReviewState) ? <> <div className="userReviewInput">
                          <input className="userReviewInputText" type="text" id="review" name="review" required  onChange={e => setUserReview(e.target.value)}/>
                          <label>Review</label>
                     </div>   
                     <button type="submit" className="btnReview" onClick={sendReview}>Send a Review</button> </> : ''
                         } */}
                       
                        <div className="flex large-gap">
                        { (localStorage.getItem("user")) ? 
                            <a href="#book-session" className="button button1" id="bookingbutton">BOOK NOW</a>:  <a href="/Register" className="button button1" id="bookingbutton">Register and book your free snowboard lesson Now!</a>
                        
}
                        </div>
                      </div>
                      <div className="grid feature-grid">
                        <img className="treesmall" src="images/Polygon 2.png" alt=""></img>
                        <img className="tree" src="images/Polygon 3 (2).png" alt=""></img>
                        <img className="tree" src="images/Polygon 6.png" alt=""></img>
                        <img className="bottom" src="images/Polygon 7 (2).png" alt=""></img>
                        <img className="sunwhite" src="images/Ellipse 1.png" alt=""></img>
                      
                        <img className="sunbluish" src="images/Ellipse 3 (2).png" alt=""></img>
                        <img className="cloud " src="images/pattern (2) 2.png" alt=""></img>
                        <img className="cloud " src="images/pattern (2) 3.png" alt=""></img>
                        <img className="cloudbig " src="images/Vector.png" alt=""></img>
                        <img className="snowboarder" id="snowboardertwo" src="images/snowboarder.png" alt=""></img>
                        <img className="treesmall" src="images/Polygon 2.png" alt=""></img>
                        <img className="tree" src="images/Polygon 6.png" alt=""></img>
                      </div>
            
                    </div>
                    </div>
                </section>
             
                <video autoPlay loop muted playsInline className="backvideo">
                  <source src="./images/snowvideo.mp4" type="video/mp4" />
                     </video>
                    
                    
                     
                          <main className="testimonial-grid" >
                            {
                         
                           
                            
                              getMultipleRandom(cards,5).map((card)=>
                                
                             
                                ( 
                                  ( <TestimonialCard  cardStyle={randomArrayCardStyle.next().value} cardGridSpan ={((card.cardId === 1) || (card.cardId === 4) || (card.cardId===5)) ? 'grid-col-span-2': ''} cardUserName={card.cardUserName} cardPosition={card.cardPosition} cardDescriptionOne={card.cardDescriptionOne} cardDescriptionTwo={card.cardDescriptionTwo} cardImage={card.cardImage}  /> )
                                )

                              )
                             }


                                
                              

                              {/* <article className={"testimonial testimonialHover flow bg-primary-400 quote text-neutral-100 grid-col-span-2 testimonialHidden" } >
                                <div className="flex">
                                  <div>
                                    <img  src="images/image-daniel.jpg" alt="daniel clifford" />
                                  </div>
                                  <div>
                                    <h2 className="name">Daniel Clifford</h2>
                                    <p className="position">Gold Medal Olimpian</p>
                                  </div>
                                </div>
                                <p>
                                  Snowboard Addiction helps snowboarders get to the next level with their sick boards.
                                </p>
                                <p>
                                  “ Trampolines help me with my air awareness and help me break down tricks. Whether it's a new trick,
                                   or a trick I'm already doing on snow, it helps create the perfect replication of being in the air ”
                                </p>
                              </article>
                              <article className={"testimonial testimonialHover flow bg-secondary-400 text-neutral-100  testimonialHidden" } >
                                <div className="flex">
                                  <div>
                                    <img src="images/image-jonathan.jpg" alt="Jonathan Walters" />
                                  </div>
                                  <div>
                                    <h2 className="name">Jonathan Walters</h2>
                                    <p className="position">Snowboard Prodigy & Team Rider</p>
                                  </div>
                                </div>
                                <p>
                                  The team was very supportive and kept me motivated
                                </p>
                                <p>
                                  “ When Gabe started riding park he was quick to get sendy on jumps but rails scared him.
                                   After getting a training board setup Gabe started practicing at home and 
                                   taking the confidence he gained there to the park and sticking it on jib features first go ”
                                </p>
                              </article>
                              <article className={"testimonial testimonialHover flow bg-neutral-100 text-secondary-400 testimonialHidden" }  >
                                <div className="flex">
                                  <div>
                                    <img src="images/image-jeanette.jpg" alt="Jeanette Harmon" />
                                  </div>
                                  <div>
                                    <h2 className="name">Jeanette Harmon</h2>
                                    <p className="position">Snowboard Addiction Customer</p>
                                  </div>
                                </div>
                                <p>
                                  An overall wonderful and rewarding experience</p>
                                <p>
                                  “ I came across Snowboard Addiction in 2008 I was brand new to the sport & knew nothing. 
                                  Everything I have learned since then is on the foundation of your tutorials. Each year I set new goals 
                                  and thanks to SA I know exactly how to achieve them ”
                                </p>
                              </article>
                              <article className={"testimonial testimonialHover  flow bg-secondary-500 text-neutral-150 grid-col-span-2 testimonialHidden"}  >
                                <div className="flex">
                                  <div>
                                    <img  src="images/image-patrick.jpg" alt="Patrick Abrams" />
                                  </div>
                                  <div>
                                    <h2 className="name">Patrick Abrams</h2>
                                    <p className="position">Olimpic   Coach</p>
                                  </div>
                                </div>
                                <p>
                                  Awesome teaching support from TAs who did the bootcamp themselves. Getting guidance from them and
                                  learning from their experiences was easy.
                                </p>
                                <p>
                                  “ The boards are great! Really durable... 
                                  The sky is the limit with these boards. 
                                  You can use them on a trampoline to practice your grabs... 
                                  It opens your mind on rotation ”
                                </p>
                              </article>
                              <article className={"testimonial testimonialHover flow bg-neutral-100 text-secondary-400 grid-col-span-2 testimonialHidden"} >
                                <div className="flex">
                                  <div>
                                    <img src="/images/image-kira.jpg" alt="Kira Whittle" />
                                  </div>
                                  <div>
                                    <h2 className="name">Kira Whittle</h2>
                                    <p className="position">FWT  Competitor</p>
                                  </div>
                                </div>
                                <p>
                                  Such a life-changing experience. Highly recommended!
                                </p>
                                <p>
                                  “ The Jib Board & Balance Bar help me keep my tricks on lock throughout the season, at home and over the summer months, with the plus of getting a bit of a winter vibe ”
                                </p>
                              </article> */}
                              <article className={"testimonial flow bg-primary-400 text-neutral-100  "} >
                                <div className="flextwo">
                                
                                    <iframe className="map" title="MyMap"  src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d2559.9208152252354!2d-123.0433384!3d50.0877694!3m2!1i1024!2i768!4f13.1!4m8!3e2!4m0!4m5!1s0x54873ccb12ec0aaf%3A0xdbbd4efd1574dae4!2sSnowboard%20Addiction%2C%201055%20Millar%20Creek%20Rd%20%23204%2C%20Whistler%2C%20BC%20V8E%200K7!3m2!1d50.0877694!2d-123.04114969999999!5e0!3m2!1sru!2sru!4v1681344788029!5m2!1sru!2sru" width="800px" height="400px" style={{border:0, allowfullscreen:"" ,loading:"lazy" ,referrerpolicy:"no-referrer-when-downgrade"}}></iframe>
                                  </div>
                                  <p>
                                   For life changin experience:
                                  </p>
                                  <p className="Visitbig">Visit us at:Whistler, CA</p>
                                  <p className="Visitsmall">Visit us at:Whistler, CA</p>
                                  
                              </article>
                             
                              </main>             
              
        </main>
        { (localStorage.getItem("user")) ? 
        <>
              <div className="wrapper">
        
             <section id="book-session">
                <div className="accordion">
                    <div className="accordion-panel">
                        <h2 id="panel1-heading">
                            <button className="accordion-trigger" 
                            aria-controls="panel1-content" 
                            aria-expanded="true"
                            >
                               <span className="accordion-title" id="panel1-title">Jumping</span>
                               <img aria-hidden="true" className="accordion-icon" src="images/icons8-snowboarding-64.png" alt="">
                               
                               </img>
                            </button>
                        </h2>
                        <div className="accordion-content" 
                        id="panel1-content"
                        ariaLabelledby="panel1-heading"
                        aria-hidden='true'
                        role="region"
                        >
                        <p>
                            Join a live snowboarding jumping  coaching session
                    
                        </p>
                        <p>
                        ADDICTION+ Live Sessions
                        </p>
                        <p>
                        Every Sunday at 5pm PST / 8pm EDT

                        </p>
                        <p>
                        Previous live sessions are available on demand in the members area.
                        </p>
                        <p>
                        We'll teach you how to Fly  
                        </p>
                        <div className="user-name-input">
                            {/* <input placeholder="Enter your name" className="user-name-jumping" /> */}
                            <Link  className="session-check-button" id="session-check-button-jumping" to="/Sessions" >Check for sessions.</Link>
                        </div>
                        {/* <div className="session-time-join" id="session-time-join-jumping">
                            <p id="session-join-date-jumping-one">
                                December 11th, 2023
                            </p>
                            <p id="session-join-type-jumping-one">	
                                Live Session 1, Body Position
                            </p>
                            <button 
                            className="session-join-button" id="session-join-button-jumping-one">Join</button>
                            <p id="session-join-date-jumping-two">
                                December 18th, 2023
                            </p>
                            <p id="session-join-type-jumping-two">	
                                Live Session 2, Pressed Position
                            </p>
                            <button  
                             className="session-join-button" id="session-join-button-jumping-two">Join</button>
                            <p id="session-join-date-jumping-three">
                                January 1st, 2023
                            </p>
                            <p id="session-join-type-jumping-three">	
                                    
                                Live Session 3, Rotation/Counter Rotation
                            </p>
                            <button  
                             className="session-join-button" id="session-join-button-jumping-three">Join</button>
                        </div> */}
                        <img  className="accordion-image" src="images/Anna-Gasser-Prime-Park-Sessions-Big-Air-Olympic-Snowboarding-Preview.jpg" alt="Join a snowboarding jumping live coaching session"></img>
                    </div>
                </div>
        
                <div className="accordion-panel">
                    <h2 id="panel2-heading">
                        <button className="accordion-trigger" 
                        aria-controls="panel2-content" 
                        aria-expanded="false"
                        >
                           <span  className="accordion-title" id="panel2-title">Jibbing</span>
                           <img aria-hidden="true" className="accordion-icon" src="images/jibbing2.png" alt="">
                           
                           </img>
                        </button>
                    </h2>
                    <div className="accordion-content" 
                    id="panel2-content"
                    ariaLabelledby="panel2-heading"
                    aria-hidden='true'
                    role="region"
                    >
                    <p>
                        Join a live snowboarding jibbing  coaching session
                    </p>
                    <p>
                        ADDICTION+ Live Sessions
                        </p>
                        <p>
                        Every Sunday at 5pm PST / 8pm EDT

                        </p>
                        <p>
                        Previous live sessions are available on demand in the members area.
                        </p>
                        <p>
                        U'll be harder then iron
                        </p>
                    <div className="user-name-input">
                        {/* <input placeholder="Enter your name" className="user-name-jibbing" /> */}
                         <Link  className="session-check-button" id="session-check-button-jibbing" to="/Sessions">Check for sessions.</Link>
                    </div>
                    {/* <div className="session-time-join"  id="session-time-join-jibbing">
                      <p id="session-join-date-jibbing-one">
                          December 11th, 2023
                      </p>
                      <p id="session-join-type-jibbing-one">	
                          Live Session 1, Body Position
                      </p>
                      <button  
                      className="session-join-button"  id="session-join-button-jibbing-one">Join</button>
                      <p id="session-join-date-jibbing-two">
                          January 22nd, 2023
                      </p>
                      <p id="session-join-type-jibbing-two">		
                          Live Session 6, Sliding on different parts of your board
                      </p>
                      <button  
                       className="session-join-button"  id="session-join-button-jibbing-two" >Join</button>
                      <p id="session-join-date-jibbing-three">
                         January 29th, 2023
                      </p>
                      <p id="session-join-type-jibbing-three">	
                         Live Session 7, 5050s with 180s out
                      </p>
                      <button  
                      className="session-join-button"  id="session-join-button-jibbing-three">Join</button>
                  </div> */}
                    <img className="accordion-image"   src="images/Jibbing.jpeg" alt="Join a snowboarding jibbing live coaching session"></img>
                </div>
            </div>
                
        
                <div className="accordion-panel">
                <h2 id="panel3-heading">
                    <button className="accordion-trigger" 
                    aria-controls="panel3-content" 
                    aria-expanded="false"
                    >
                       <span  className="accordion-title" id="panel3-title">Buttering</span>
                       <img aria-hidden="true" className="accordion-icon" src="images/butter-butter-svgrepo-com.png" alt="">
                       
                       </img>
                    </button>
                </h2>
                <div className="accordion-content" 
                id="panel3-content"
                ariaLabelledby="panel3-heading"
                aria-hidden='true'
                role="region"
                >
                <p>
                    Join a live snowboarding buttering  coaching session
                </p>
                <p>
                 ADDICTION+ Live Sessions
                </p>
                <p>
                Every Sunday at 5pm PST / 8pm EDT

                </p>
                <p>
                Previous live sessions are available on demand in the members area.
                </p>
                <p>
                U'll ride smooth like butter
                </p>
                <div className="user-name-input">
                    {/* <input placeholder="Enter your name" className="user-name-buttering" /> */}
                   <Link 
                    className="session-check-button"  id="session-check-button-buttering" to="/Sessions" >Check for sessions.</Link>
                </div>
                {/* <div className="session-time-join"  id="session-time-join-buttering">
                  <p id="session-join-date-buttering-one">
                      December 11th, 2023
                  </p>
                  <p id="session-join-type-buttering-one">	
                      Live Session 1, Body Position
                  </p>
                  <button  
                  className="session-join-button" id="session-join-button-buttering-one">Join</button>
                  <p id="session-join-date-buttering-two">
                      March 19th, 2023 
                  </p>
                  <p id="session-join-type-buttering-two">	 	
                      Live Session 14, Nose & Trail Presses with 180s out
                  </p>
                  <button  
                   className="session-join-button" id="session-join-button-buttering-two">Join</button>
                  <p id="session-join-date-buttering-three">
                      April 2nd, 2023
                  </p>
                  <p id="session-join-type-buttering-three">	
                      Live Session 16, 180 into presses
                  </p>
                  <button  
                  className="session-join-button" id="session-join-button-buttering-three">Join</button>
              </div> */}
                <img className="accordion-image"  src="images/snowboard-tricks-to-learn-now-press-3.webp" alt="Join a snowboarding buttering live coaching session"></img>
                </div>
            </div>
            </div>
          </section>
         </div> 
         </> : ''}
         <div className="page-header">
          <div className="containerTwo flow">
            <h1 className="page-title">Our Goal Is To Improve Your Riding!</h1>
            <p className="page-subtitle">The training tools that every snowboarder needs!</p>
          </div>
        </div>
     
        <h2 className="section-title">Our Shop</h2>
          <MediaScrollerBig onAddToCart={handleAddToCart} cartObj={cart}/>  
          {/* <div className="media-container">
          <div className="media-scroller">
        
          
            <div className="media-group" id="group-1">
              <div className="media-element">
                <img
                  src="https://snowboardaddiction.com/cdn/shop/products/VE_04144-Edit-2019Products_2048px_byVinceEmond_1100x.jpg?v=1670414829" 
                  alt="" />
              </div>
              <div className="media-element">
                <img
                  src="https://snowboardaddiction.com/cdn/shop/products/VE_04146-Edit-2019Products_2048px_byVinceEmond_1100x.jpg?v=1670414707"
                  alt="" />
              </div>
              <div className="media-element">
                <img
                  src="https://snowboardaddiction.com/cdn/shop/products/Sideon_Inside_1100x.png?v=1675183384"
                  alt="" />
              </div>
              <div className="media-element">
                <img
                  src="https://snowboardaddiction.com/cdn/shop/products/WTP_on_45deg_1100x.png?v=1673981281"
                  alt="" />
              </div>
              <div className="media-element">
                <img
                  src="https://snowboardaddiction.com/cdn/shop/products/Layedout_Full_1100x.png?v=1670414813"
                  alt="" />
              </div>
        
              <a className="next" href="#group-2" >
                <svg>
                  <use href="#next"></use>
                </svg>
              </a>
            </div>
        
        
            <div className="media-group" id="group-2">
              <a className="previous" href="#group-1">
                <svg>
                  <use href="#previous"></use>
                </svg>
              </a>
              <div className="media-element">
                <img
                  src="https://snowboardaddiction.com/cdn/shop/products/Top-Sheet_550x.png?v=1638982107"
                  alt="" />
              </div>
              <div className="media-element">
                <img
                  src="https://snowboardaddiction.com/cdn/shop/products/VE_04350-Edit-2019Products_2048px_byVinceEmond_1100x.jpg?v=1670414862"
                  alt="" />
              </div>
              <div className="media-element">
                <img
                  src="https://snowboardaddiction.com/cdn/shop/products/FreestyleTrainingSetup_1100x.png?v=1673982178"
                  alt="" />
              </div>
              <div className="media-element">
                <img
                  src="https://snowboardaddiction.com/cdn/shop/products/JibTrainingSetup_1100x.png?v=1673982033"
                  alt="" />
              </div>
              <div className="media-element">
                <img
                  src="https://snowboardaddiction.com/cdn/shop/products/FullJibPackage_1100x.png?v=1673982097"
                  alt="" />
              </div>
              <a className="next" href="#group-3">
                <svg>
                  <use href="#next"></use>
                </svg>
              </a>
            </div>
        
            <div className="media-group" id="group-3">
              <a className="previous" href="#group-2">
                <svg>
                  <use href="#previous"></use>
                </svg>
              </a>
              <div className="media-element">
                <img
                  src="https://snowboardaddiction.com/cdn/shop/products/AddictedTrainingSetup_1100x.png?v=1673982282"
                  alt="" />
              </div>
              <div className="media-element">
                <img
                  src="https://i1.adis.ws/i/ride/ride_2324_warpig_R2302003_1?w=412&fmt=webp&fmt.interlaced=true&bg=white&dpi=96"
                  alt=""/>
              </div>
              <div className="media-element">
                <img
                  src="https://i1.adis.ws/i/ride/ride_2223_warpig_looney-tunes-daffy_r2202029_1?w=412&fmt=webp&fmt.interlaced=true&bg=white&dpi=96"
                  alt="" />
              </div>
              <div className="media-element">
                <img
                  src="https://i1.adis.ws/i/ride/ride_2223_warpig_looney-tunes-buggs_r2202029_1?w=412&fmt=webp&fmt.interlaced=true&bg=white&dpi=96"
                  alt="" />
              </div>
              <div className="media-element">
                <img
                  src="https://i1.adis.ws/i/ride/ride_2223_burnout_R2202005_1?w=412&fmt=webp&fmt.interlaced=true&bg=white&dpi=96"
                  alt="" />
              </div>
              <a className="next" href="#group-4" >
                <svg>
                  <use href="#next"></use>
                </svg>
              </a>
            </div>
        
          
            <div className="media-group" id="group-4">
              <a className="previous" href="#group-3">
                <svg>
                  <use href="#previous"></use>
                </svg>
              </a>
              <div className="media-element">
                <img
                  src="https://i1.adis.ws/i/ride/ride_2122_R2102012_01_P_1?w=412&fmt=webp&fmt.interlaced=true&bg=white&dpi=96"
                  alt="" />
              </div>
              <div className="media-element">
                <img
                  src="https://i1.adis.ws/i/ride/ride_2223_twinpig_R2202010_A_1?w=412&fmt=webp&fmt.interlaced=true&bg=white&dpi=96"
                  alt="" />
              </div>
              <div className="media-element">
                <img
                  src="https://i1.adis.ws/i/ride/ride_2223_saturday_R2202017_1?w=412&fmt=webp&fmt.interlaced=true&bg=white&dpi=96"
                  alt="" />
              </div>
              <div className="media-element">
                <img
                  src="https://i1.adis.ws/i/ride/ride_2223_zero-jr_R2202020_1?w=412&fmt=webp&fmt.interlaced=true&bg=white&dpi=96"
                  alt="" />
              </div>
              <div className="media-element">
                <img
                  src="https://i1.adis.ws/i/ride/ride_2223_heartbreaker_R2202019_1?w=412&fmt=webp&fmt.interlaced=true&bg=white&dpi=96"
                  alt="" />
              </div>
            </div>
        
        
        
            <div className="navigation-indicators">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
        
          </div>
        </div>   */}
        {/* <section id="js-media--card">
         
            <div className="selected-item-grid">
              <div className="selected-item-container">
                <div className="seleected-item-image">
                  <img id="selected-item-image-id"
                  src="https://i1.adis.ws/i/ride/ride_2122_R2102012_01_P_1?w=412&fmt=webp&fmt.interlaced=true&bg=white&dpi=96"
                  alt="" />
                </div>
                <div className="seleected-item-name">
                  RIDE WARPIG SNOWBOARD 2024
                </div>
                <div className="selected-item-rating-container">
                  <img src="images/rating-40.png" />
                  <div className="selected-item-rating-count">
                    87
                 </div>
                </div>
                <div className="selected-item-available-container">
                  <img src="images/icons8-green-dot-48.png" />
                  <div className="selected-item-rating-count">
                    Item is available
                 </div>
                </div>
              <button  className="selected-item-button" id="selected-item-button-grid" onClick={removeItem}>Add to cart</button>
              </div>
            </div>
          
        </section> */}
{/*         
        <svg>
          <symbol id="next" viewBox="0 0 256 512">
            <path fill="purple"
              d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
          </symbol>
        
          <symbol id="previous" viewBox="0 0 256 512">
            <path fill="purple"
              d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" />
          </symbol>
        </svg>
        */}
      
        
        </div>
        // </>
      )
    }

    /*
    (userInputData === '' && value ==='') ? book : book.name.toLowerCase().includes(userInputData)
    */

    export default Home;
    
