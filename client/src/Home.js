import React, { useEffect, useState, useRef} from 'react';
import './App.css';
import {Link,useNavigate} from 'react-router-dom'
import TestimonialCard from './testimonialCard'

import { generator, getMultipleRandom } from './randomGenerator';
import { motion, useCycle } from "framer-motion";
import MediaScrollerBig from './mediaScroller';
import AuthService from './services/auth.service';
import Modal from './Modal.js';


function Home() {
  const [mobile, setMobile] = useState(true);
  const isMobile = useRef(false);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [isDisplayNone, setIsDisplayNone] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const initialCart = JSON.parse(localStorage?.getItem('cart')) ?  JSON.parse(localStorage?.getItem('cart')) : [];
  const [cart, setCart] = useState(initialCart);
  const [cartQuantity, setCartQuantity] = useState(0);
  let navigate = useNavigate(); 
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
    localStorage.setItem('cart', JSON.stringify(cart));
  }


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
      console.log(`added  product to card if no local`);
      setCartQuantity(cartQuantity + 1)
      saveToStorage();
  }

    useEffect(()=>{
      saveToStorage();
    },[])

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
    }, []);

    useEffect(() => {
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
        if (window.innerWidth < 650 ) {
          setMobile(true);
        } else if (window.innerWidth >= 720 ) {
          setMobile(false);
        }
      };
    
      window.addEventListener("resize", resize);
      resize();
      return () => {
        window.removeEventListener("resize", resize);
      };
    }, []);
  
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
 

  const randomArrayCardStyle = generator([1,2,3,4]);

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 0px 0px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: "circle(60px at 185px 68px)",
      transition: {
        delay: 0.05,
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





const Path = (props) => (
<motion.path
  fill="transparent"
  strokeWidth="5"
  stroke="hsl(276, 100%, 50%)"
  strokeLinecap="round"
  {...props}
/>
);
 

      return (
     
        <div>
            <main>
              {
                (isOpen) ?  <div className='bigDivOpenedNav' onClick={toggleOpen}></div> : null
              }
              <header className="loginHeader">
                <nav className="navigation">
                      <img className="logo" src="images/SA_Primary_Black_Lettering_CMYK_40795a05-689d-4bb9-95de-a4b1596bfaa0_110x.avif" width="55" height="55"  alt="" />
                      {(mobile && localStorage.getItem("user") && localStorage.getItem('cart')) ? 
                      (<>
                          <motion.nav
                          initial={false}
                          animate={isOpen ? "open" : "closed"}
                          className="nav-mobile"
                          >
                              <motion.div className="background" variants={sidebar} >
                              <motion.ul
                                variants={variants}
                                className="sidebar"
                              >
                                <motion.div className="list-item" variants={livariants}>
                                  <Link class="cart-link header-link" to="/Checkout"  >
                                  <img class="cart-icon" src="images/icons/cart-icon.png"/>
                                  <div class="cart-quantity js-cart-quantity">{JSON.parse(localStorage.getItem("cart")).length}</div>
                                  <div class="cart-text">Cart</div>
                                  </Link> 
                                  <div>
                                  <h4 className="userGreeting"> Hi <Link className='userPageLink' prefetch={false} reloadDocument id="glow-on-hover-mobile-userpage" to={`/${JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))}`}> {JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))} </Link> </h4> 
                                  <span>(Visit your page)</span>
                                  </div>
                                  <button class="logOutButtonMobile" type="submit" id="glow-on-hover-mobile-logout" onClick={() => setModalActive(true)}>Logout</button>
                              </motion.div> 
                              </motion.ul>
                              </motion.div>
                              <button className="sidebar-btn" onClick={toggleOpen}>
                                <svg width="40" height="40" viewBox="0 0 23 23" className='burgerMenuBtn'>
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
                      ) : 
                      ((!mobile && (localStorage.getItem("user") && localStorage.getItem("cart"))))  ?
                      <div class="navUserLogout">
                          <Link class="cart-link header-link" to="/Checkout"  >
                          <img class="cart-icon" src="images/icons/cart-icon.png"/>
                          <div class="cart-quantity js-cart-quantity">{JSON.parse(localStorage.getItem("cart")).length}</div>
                          <div class="cart-text">Cart</div>
                          </Link>  
                          <h4 className="userGreeting"> Hi <Link className='userPageLink' prefetch={false} reloadDocument id="glow-on-hover-user" to={`/${JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))}`}> {JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))} </Link> </h4>
                          <button class="logOutButton" type="submit" id="glow-on-hover" onClick={() => setModalActive(true)}>Logout</button>
                      </div>  : (localStorage.getItem("user")) ?
                       <>
                       <div class="navUserLogout">
                          <h4 className="userGreeting"> Hi <Link className='userPageLink' prefetch={false} reloadDocument id="glow-on-hover-user" to={`/${JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))}`}> {JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))} </Link></h4> 
                          <button class="logOutButton" type="submit" id="glow-on-hover" onClick={() => setModalActive(true)}>Logout</button>
                       </div>
                      </>
                      :
                      ( <Link className="buttonLogin" to="Login">Login</Link>)}
                </nav>

                 <Modal active={modalActive} setActive={setModalActive} text={'You sure you want to Logout?'} btn1={'No'} btn2={'Yes, logout!'} />
          
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
                        <div className="flex large-gap">
                          { (localStorage.getItem("user")) ? 
                              <a href="#book-session" className="button button1" id="bookingbutton">BOOK NOW</a> :
                              <a href="/Register" className="button button1" id="bookingbutton">Register and book your free snowboard lesson Now!</a>
                          
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
                            { getMultipleRandom(cards,5).map((card)=>
                                ( 
                                  ( <TestimonialCard  cardStyle={randomArrayCardStyle.next().value} cardGridSpan ={((card.cardId === 1) || (card.cardId === 4) || (card.cardId===5)) ? 'grid-col-span-2': ''} cardUserName={card.cardUserName} cardPosition={card.cardPosition} cardDescriptionOne={card.cardDescriptionOne} cardDescriptionTwo={card.cardDescriptionTwo} cardImage={card.cardImage}  /> )
                                )
                              )
                             }
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
                                <Link  className="session-check-button" id="session-check-button-jumping" to="/Sessions" >Check for sessions.</Link>
                            </div>
                        
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
                            <Link  className="session-check-button" id="session-check-button-jibbing" to="/Sessions">Check for sessions.</Link>
                        </div>
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
                      <Link className="session-check-button"  id="session-check-button-buttering" to="/Sessions" >Check for sessions.</Link>
                    </div>
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
          <MediaScrollerBig onAddToCart={handleAddToCart} />  
        </div>
       
      )
    }

    export default Home;
    