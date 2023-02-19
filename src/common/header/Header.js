import React from "react";
import "./Header.css";
import { Button } from "@material-ui/core";
import logo from "../../assets/logo.svg";


export default function Header(props){
    
    
    return( 
        <header className="app header">  
            <nav className="app header navigation">       
                <ul id="logo1">
                    <li><img src={logo} className="App-logo" alt="logo" /></li>
                </ul>
                <ul id = "buttons2" >
                    <li><Button className="BookShow" id="bookShow"  variant="contained" color="primary" >Book Show</Button></li>
                    <li><Button className="loginLogout" id="login-logout-button"  variant="contained" color="default" >LOGIN</Button></li>    
                </ul>
            </nav>
        </header>
    )
}