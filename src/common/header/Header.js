import React from "react";
import "./Header.css";
import { Button } from "@material-ui/core";
import logo from "../../assets/logo.svg";
import ModalDialog from './ModalDialog';
import { useState, useEffect } from 'react';


export default function Header(props){

    // declare a new state variable for modal open
    const [open, setOpen] = useState(false);
    const [loggedin, setLoggedIn] = useState(false);

    
   
    // function to handle modal open
    const handleOpen = () => {
        setOpen(true);
    };

    // function to handle modal close
    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout =async () => {
        
        const rawResponse = await fetch('http://localhost:8085/api/v1/auth/logout', {
            method : 'POST',
            headers : {
            authorization : `Bearer ${sessionStorage.getItem("access-token")}`
            }
        });
            if(rawResponse.ok){
                sessionStorage.removeItem("access-token");
                setLoggedIn(false);
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
                        <li><Button className="BookShow" id="bookShow"  variant="contained" color="primary" >Book Show</Button></li>
                        {  !loggedin && <li><Button className="loginLogout" id="login-button"  variant="contained" color="default" onClick={handleOpen} >LOGIN</Button></li>}
                        { loggedin && <li><Button className="loginLogout" id="logout-button"  variant="contained" color="default" onClick={handleLogout} >LOGOUT</Button></li>}    
                    </ul>
                </nav>
            </header>
            <ModalDialog closeAfterTransition open={open} handleClose={handleClose} loggedin={loggedin} setLoggedIn = {setLoggedIn} />        
        </div>
    )
}