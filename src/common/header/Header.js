import React from "react";
import "./Header.css";
import { Button } from "@material-ui/core";
import logo from "../../assets/logo.svg";
import ModalDialog from './ModalDialog';
import { useState } from 'react';


export default function Header(props){

    // declare a new state variable for modal open
    const [open, setOpen] = useState(false);
    const loginOrLogout = "LOGIN";

    // function to handle modal open
    const handleOpen = () => {
        setOpen(true);
    };

    // function to handle modal close
    const handleClose = () => {
        setOpen(false);
    };

    
    
    return( 
        <div>
            <header className="app header">  
                <nav className="app header navigation">       
                    <ul id="logo1">
                        <li><img src={logo} className="App-logo" alt="logo" /></li>
                    </ul>
                    <ul id = "buttons2" >
                        <li><Button className="BookShow" id="bookShow"  variant="contained" color="primary" >Book Show</Button></li>
                        <li><Button className="loginLogout" id="login-logout-button"  variant="contained" color="default" onClick={handleOpen} >{loginOrLogout}</Button></li>    
                    </ul>
                </nav>
            </header>
            <ModalDialog open={open} handleClose={handleClose}/>        
        </div>
    )
}