import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from '@material-ui/styles/withStyles';
import Login from './Login';
import Register from './Register';
import { FormControl } from '@material-ui/core';
import { useState } from 'react';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Form(props) {
  const [value, setValue] = React.useState(0);
  const {handleClose , loggedin , setLoggedIn , baseUrl} = props;
  const [ userIsLoggedIn , setUserIsLoggedIn] = useState(false);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box style={{marginTop: 10, marginLeft : 15,marginRight : 15}}>
      <Box >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="LOGIN" {...a11yProps(0)} />
          <Tab label="REGISTER" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Login loggedin = {loggedin} setLoggedIn = {setLoggedIn} handleClose={handleClose} props ={props} baseUrl = {baseUrl}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Register props ={props} baseUrl = {baseUrl}/>
      </TabPanel>
    </Box>
  );
}
