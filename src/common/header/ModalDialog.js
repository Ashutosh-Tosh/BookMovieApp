
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Form from './Form';

const ModalDialog = (props) => {
  const { open, handleClose , loggedin , setLoggedIn} = props;
  const {baseUrl} = props;
  return (
    <Dialog open={open} onClose={handleClose}>
      <Form handleClose={handleClose} loggedin={loggedin} setLoggedIn = {setLoggedIn} props = {props} baseUrl = {baseUrl} />
    </Dialog>
  );
};

export default ModalDialog;