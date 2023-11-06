import React,{useEffect, useState } from 'react'
import './App.css';
import Protected from  "./protec"
import Home from './Home'
// import { HelmetProvider } from 'react-helmet-async';
import Login from './login'
import Register from './register'
import Profile from './Profile'
import UserPageReact from './userPage'
import EditProfilePageReact from './editProfile';
import SessionsReactPage from './sessionRegister';
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom';
import CheckOutReactPage from './checkOut';
import MediaElementWithFullDescription from './mediaElementWithFullDescruption';

function App() {
 

  return (


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
  
  );
}

export default App;
