import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Offcanvas } from 'react-bootstrap'
import './checkout.css';
import AuthService from './services/auth.service';



function ShoppingCartReact (props) {


return(
/* <Offcanvas className="cartCanvas" show={true} onHide={props.handleCartClose} placement='end'>
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
    </Offcanvas.Header>
</Offcanvas> */
<>


<Offcanvas show={true} onHide={props.handleCartClose} disableScrolling={false}>
  <Offcanvas.Header closeButton>
    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
  </Offcanvas.Header>
  <Offcanvas.Body>
    Some text as placeholder. In real life you can have the elements you
    have chosen. Like, text, images, lists, etc.
  </Offcanvas.Body>
</Offcanvas>
</>
)
}
export default ShoppingCartReact;