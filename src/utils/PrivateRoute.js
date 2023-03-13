import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom";

// import { ACCESS_TOKEN_NAME } from '../constants/apiConstants';
function PrivateRoute({ token, children }) {
  console.log("privateroute")
  let auth = false;
  useEffect(() => {
    //console.log(sessionStorage.getItem("ACCESS_TOKEN_NAME"));
    if (sessionStorage.getItem("ACCESS_TOKEN_NAME") === null || sessionStorage.getItem("ACCESS_TOKEN_NAME") === undefined) {
      token(false)
    }
    else {
      token(true)
    }
  }, [token]);
  if (sessionStorage.getItem("ACCESS_TOKEN_NAME") === null || sessionStorage.getItem("ACCESS_TOKEN_NAME") === undefined) {
    auth = false;
  }
  else {
    auth = true;
  }
  

  //console.log(auth,children)
  return auth ? children : <Navigate to="/login" />;
  
}


export default PrivateRoute;