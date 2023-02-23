
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Form from './Form';

const ModalDialog = ({ open, handleClose , loggedin , setLoggedIn}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Form handleClose={handleClose} loggedin={loggedin} setLoggedIn = {setLoggedIn} />
    </Dialog>
  );
};

export default ModalDialog;