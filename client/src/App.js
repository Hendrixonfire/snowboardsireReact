import React, { Suspense, lazy }from 'react'
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LoadingState from './LoadingState.js';
import Protected from  "./protec"
// import Home from './Home'
const Home = lazy(()=>
 import ('./Home.js')
)
const Login = lazy(()=>
 import ('./login.js')
)
const Register = lazy(()=>
 import ('./register.js')
)
const UserPageReact = lazy(()=>
 import ('./userPage.js')
)
const EditProfilePageReact = lazy(()=>
 import ('./editProfile.js')
)
const SessionsReactPage = lazy(()=>
 import ('./sessionRegister.js')
)
const CheckOutReactPage = lazy(()=>
 import ('./checkOut.js')
)
const MediaElementWithFullDescription = lazy(()=>
 import ('./mediaElementWithFullDescruption.js')
)


function App() {
 

  return (

 <Suspense fallback={<LoadingState/>}>
    <Routes>
    
   
        <Route path="/" exact={true} element={<Home /> } />
        <Route path="/Login" exact element={<Login />} /> 
        <Route path="/Register" exact element={<Register />} /> 
   
        
        <Route path="/Checkout" exact element={<CheckOutReactPage />} /> 

        <Route path="/Sessions" exact={true}  element={
          <Protected isLoggedIn={localStorage.getItem("user")}>
              <SessionsReactPage />
          </Protected>}/>
        <Route path="/:username" exact={true}  element={
          <Protected isLoggedIn={localStorage.getItem("user")}>
              <UserPageReact />
          </Protected>}/>  
          <Route path="/edit/:username" exact={true}  element={
              <Protected isLoggedIn={localStorage.getItem("user") }>
          <EditProfilePageReact/> 
          </Protected>} />
          <Route path="shopitemfull/:id" element={<MediaElementWithFullDescription />} />
    </Routes>
    </Suspense>
  );
}

export default App;
