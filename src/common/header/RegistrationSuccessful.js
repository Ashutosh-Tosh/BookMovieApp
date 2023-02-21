import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl  from '@material-ui/core/FormControl';
import { Button, FormHelperText, Input, InputLabel } from '@material-ui/core';



export default function RegistrationSuccessful(props){
    const sucssefulText = <p>Registration Successful. Please Login!</p>;
    const isitTrue = {props};
    if(isitTrue){
        return(sucssefulText)
    }
 
    return(<p>again</p>)
}