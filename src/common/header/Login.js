import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from '@material-ui/styles/withStyles';
import FormControl  from '@material-ui/core/FormControl';
import { Button, FormHelperText, Input, InputLabel } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";


const handleSubmit = ()=> {
    
}



export default function Login(){
    return(
        <Box textAlign='center'>
            <form onSubmit={handleSubmit}  >
                <FormControl required style={{marginTop: 30 , marginBottom: 15}} className='fromunit'>
                    <InputLabel htmlFor="my-input">Username</InputLabel>
                    <Input type = "text" required id="my-input9" aria-describedby="my-helper-text" />
                </FormControl><br/> 
                <FormControl  required className='fromunit'>
                    <InputLabel htmlFor="my-input">Password</InputLabel>
                    <Input   type="password" id="my-input8" aria-describedby="my-helper-text" />
                </FormControl> <br/>
                <Button type='submit' style={{marginTop: 50 , marginBottom: 20}} className="BookShow" id="bookShow"  variant="contained" color="primary"  >LOGIN</Button>
            </form>
        </Box>
    )
}