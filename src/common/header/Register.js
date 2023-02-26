import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl  from '@material-ui/core/FormControl';
import { Button, FormHelperText, Input, InputLabel } from '@material-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';





export default function Register(props){
    
   const {baseUrl} = props;
   const [nameValue, setNameValue] = useState("");
   const [emailValue, setEmailValue] = useState("");
   const [lastNameValue, setLasNameVale] = useState("");
   const [contactValue, setContactValue] = useState("");
   const [passwrodValue, setPasswordValue] = useState("");

   const [nameValueRequired, setNameValueRequired] = useState("dispNone");
   const [emailValueRequired, setEmailValueRequired] = useState("dispNone");
   const [lastNameValueRequired, setLasNameValeRequired] = useState("dispNone");
   const [contactValueRequired, setContactValueRequired] = useState("dispNone");
   const [passwrodValueRequired, setPasswordValueRequired] = useState("dispNone");
  
    
    const[registered, setregistered] = useState(false);
  
    
  


    
        const postregistration = async () => {


            emailValue === "" ? setEmailValueRequired("dispBlock") : setEmailValueRequired("dispNone");
            nameValue === "" ? setNameValueRequired("dispBlock") : setNameValueRequired("dispNone");
            lastNameValue === "" ? setLasNameValeRequired("dispBlock") : setLasNameValeRequired("dispNone");
            contactValue === "" ? setContactValueRequired("dispBlock") : setContactValueRequired("dispNone");
            passwrodValue === "" ? setPasswordValueRequired("dispBlock") : setPasswordValueRequired("dispNone");
            
            const params = {    
                                "email_address": emailValue,
                                "first_name": nameValue,
                                "last_name": lastNameValue,
                                "mobile_number": contactValue,
                                "password" : passwrodValue
                            }
             
                           
        const rawResponse = await fetch(`${baseUrl}signup`, {
                                        body : JSON.stringify(params),
                                        method : 'POST',
                                        headers : {
                                            "Content-Type" : "application/json",
                                            "Access-Control-Allow-Origin" : "*"
                                        }
            });
            if(rawResponse.ok){
                const result = await rawResponse.json();
                console.log("--->Registered Sucessfully--->");
                if(result.status=="ACTIVE"){
                    setregistered(true);
                }
            }
        }


    return(
        <Box textAlign='center'>
            <form >
            <FormControl required style={{marginTop: 30, marginBottom: 20}} className='fromunit'>
                <InputLabel htmlFor="my-input">First Name</InputLabel>
                <Input onChange={(event) => {setNameValue(event.target.value)}} type = "text" id="my-input1" aria-describedby="my-helper-text" />
                <FormHelperText className={nameValueRequired}>
                <span className="red">required</span>
                </FormHelperText>
            </FormControl><br/> 
            <FormControl style={{marginBottom: 20}} required className='fromunit'>
                <InputLabel htmlFor="my-input">Last Name</InputLabel>
                <Input onChange={(event) => {setLasNameVale(event.target.value)}} type = "text" required id="my-input2" aria-describedby="my-helper-text" />
                <FormHelperText className={lastNameValueRequired}>
                <span className="red">required</span>
                </FormHelperText>
            </FormControl><br/> 
            <FormControl style={{marginBottom: 20}} required className='fromunit'>
                <InputLabel  htmlFor="my-input">Email</InputLabel>
                <Input onChange={(event) => {setEmailValue(event.target.value)}} type = "email" required id="my-input3" aria-describedby="my-helper-text" />
                <FormHelperText className={emailValueRequired}>
                <span className="red">required</span>
                </FormHelperText>
            </FormControl><br/> 
            <FormControl style={{marginBottom: 20}} required className='fromunit'>
                <InputLabel htmlFor="my-input">Password</InputLabel>
                <Input onChange={(event) => {setPasswordValue(event.target.value)}} type = "password" required id="my-input4" aria-describedby="my-helper-text" />
                <FormHelperText className={passwrodValueRequired}>
                <span className="red">required</span>
                </FormHelperText>
            </FormControl><br/>  
            <FormControl  style={{marginBottom: 20}} required className='fromunit'>
                <InputLabel htmlFor="my-input">Contact No.</InputLabel>
                <Input  onChange={(event) => {setContactValue(event.target.value)}} type = "text" required id="my-input5" aria-describedby="my-helper-text" />
                <FormHelperText className={contactValueRequired}>
                <span className="red">required</span>
                </FormHelperText>
            </FormControl><br/> 
            <Button onClick={postregistration}  style={{marginTop: 50 , marginBottom: 20}} className="BookShow" id="bookShow"  variant="contained" color="primary">REGISTER</Button>
            {registered && <p>Registration Successful. Please Login!</p>}
            </form>
        </Box>
    )
}