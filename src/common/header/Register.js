import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl  from '@material-ui/core/FormControl';
import { Button, FormHelperText, Input, InputLabel } from '@material-ui/core';
import { useState } from 'react';




export default function Register(){

    const[registered, setregistered] = useState(false);
  const handleSubmit = ()=> {
    setregistered(true);
}

    return(
        <Box textAlign='center'>
            <form onSubmit={handleSubmit}>
            <FormControl required style={{marginTop: 30, marginBottom: 20}} className='fromunit'>
                <InputLabel htmlFor="my-input">First Name</InputLabel>
                <Input type = "text" required id="my-input1" aria-describedby="my-helper-text" />
            </FormControl><br/> 
            <FormControl style={{marginBottom: 20}} required className='fromunit'>
                <InputLabel htmlFor="my-input">Last Name</InputLabel>
                <Input type = "text" required id="my-input2" aria-describedby="my-helper-text" />
            </FormControl><br/> 
            <FormControl style={{marginBottom: 20}} required className='fromunit'>
                <InputLabel  htmlFor="my-input">Email</InputLabel>
                <Input type = "email" required id="my-input3" aria-describedby="my-helper-text" />
            </FormControl><br/> 
            <FormControl style={{marginBottom: 20}} required className='fromunit'>
                <InputLabel htmlFor="my-input">Password</InputLabel>
                <Input type = "password" required id="my-input4" aria-describedby="my-helper-text" />
            </FormControl><br/>  
            <FormControl  style={{marginBottom: 20}} required className='fromunit'>
                <InputLabel htmlFor="my-input">Contact No.</InputLabel>
                <Input   type = "text" required id="my-input5" aria-describedby="my-helper-text" />
            </FormControl><br/> 
            <Button onClick={handleSubmit}  style={{marginTop: 50 , marginBottom: 20}} className="BookShow" id="bookShow"  variant="contained" color="primary">REGISTER</Button>
            {registered && <p>Registration Successful</p>}
            </form>
        </Box>
    )
}