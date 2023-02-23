import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Box from '@material-ui/core/Box';
import styles from '@material-ui/styles/withStyles';
import FormControl  from '@material-ui/core/FormControl';
import { Button, FormHelperText, Input, InputLabel } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useState } from 'react';






export default function Login({ handleClose , loggedin , setLoggedIn }){

    const   [userNameValue,setUserNameValue] = useState("");
    const   [userPasswordValue,setUserPasswordValue] = useState("");

    const tryLogginIn = async () => {

        
  
    const rawResponse = await fetch('http://localhost:8085/api/v1/auth/login', {
                                    method : 'POST',
                                    headers : {
                                    authorization : `Basic ${window.btoa(`${userNameValue}:${userPasswordValue}`)}`
                                }
        });
        if(rawResponse.ok){
            const result = await rawResponse.json();
            console.log(result);
            if(result.status == "ACTIVE"){
            setLoggedIn(true);
            sessionStorage.setItem("access-token", rawResponse.headers.get("access-token"));
            handleClose();
            }
        }
    }


    return(
        <Box textAlign='center' >
            <form>
                <FormControl required style={{marginTop: 30 , marginBottom: 15}} className='fromunit'>
                    <InputLabel htmlFor="my-input">Username</InputLabel>
                    <Input onChange={(event) => {setUserNameValue(event.target.value)}} type = "text" required id="my-input9" aria-describedby="my-helper-text" />
                </FormControl><br/> 
                <FormControl  required className='fromunit'>
                    <InputLabel htmlFor="my-input">Password</InputLabel>
                    <Input onChange={(event) => {setUserPasswordValue(event.target.value)}} type="password" id="my-input8" aria-describedby="my-helper-text" />
                </FormControl> <br/>
                <Button onClick={tryLogginIn}  style={{marginTop: 50 , marginBottom: 20}} className="BookShow" id="bookShow"  variant="contained" color="primary"  >LOGIN</Button>
            </form>
        </Box>
    )
}