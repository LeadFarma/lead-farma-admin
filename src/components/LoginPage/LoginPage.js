import React from 'react';
import { Login } from 'react-admin';


const classes = {
  login: {
    main: {
      backgroundColor: '#fcf6f6',
    }
  }
}

const LoginPage = () => {

  return(
    <Login style={classes.login.main} backgroundImage="" />
  )
}

export default LoginPage;
