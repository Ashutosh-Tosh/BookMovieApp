import React from "react";
import "./Header.css";
import { Button } from "@material-ui/core";
import logo from "../../assets/logo.svg";
import ModalDialog from './ModalDialog';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Header(props){
    const{baseUrl, bookShowButton, setBookShowButton} = props;

    // declare a new state variable for modal open

    const [open, setOpen] = useState(false);
    const [loggedin, setLoggedIn] = useState( sessionStorage.getItem("access-token") == null ? false : true);

    
   
    // function to handle modal open
    const handleOpen = () => {
        setOpen(true);
    };

    // function to handle modal close
    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout =async () => {
        
        const rawResponse = await fetch(`${baseUrl}auth/logout`, {
            method : 'POST',
            headers : {
            authorization : `Bearer ${sessionStorage.getItem("access-token")}`
            }
        });
            if(rawResponse.ok){
                sessionStorage.removeItem("access-token");
                setLoggedIn(false);
                console.log("---->>Logged-Out sucessfully<<----");
            }
        }
        

    
    
    return( 
        <div>
            <header className="app header">  
                <nav className="app header navigation">       
                    <ul id="logo1">
                        <li><img src={logo} className="App-logo" alt="logo" /></li>
                    </ul>
                    <ul id = "buttons2" >
                        { bookShowButton && loggedin && <li><Link style={{ textDecoration: 'none' }} to ={`/bookshow/${props.id}`}> <Button style={{ marginRight : '10px' }} className="BookShow" id="bookShow2"  variant="contained" color="primary">Book Show</Button></Link></li>}
                        { bookShowButton && !loggedin && <li><Button style={{ marginRight : '10px' }} className="BookShow" id="bookShow"  variant="contained" color="primary" onClick={handleOpen}>Book Show</Button></li>}
                        {  !loggedin && <li><Button style={{ marginRight : '24px' }} className="loginLogout" id="login-button"  variant="contained" color="default" onClick={handleOpen} >LOGIN</Button></li>}
                        { loggedin && <li><Button style={{ marginRight : '24px' }} className="loginLogout" id="logout-button"  variant="contained" color="default" onClick={handleLogout} >LOGOUT</Button></li>}    
                    </ul>
                </nav>
            </header>
            <ModalDialog  baseUrl = {baseUrl} closeAfterTransition open={open} handleClose={handleClose} loggedin={loggedin} setLoggedIn = {setLoggedIn} props = {props} />        
        </div>
    )
}