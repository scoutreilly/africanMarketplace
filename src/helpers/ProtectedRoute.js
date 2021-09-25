import React from "react";
import { Route, Redirect } from "react-router";

// If the user is authenticated, render the "component" prop (normal behavior)
// Otherwise, redirect to /login

const ProtectedRoute = ({component, ...rest}) => {
  return <Route {...rest} render={(props) => {
      if(localStorage.getItem('token')) {
          return(<component {...props} />)
      }else {
          return <Redirect to='/login' />
      }
  }} />
}

export default ProtectedRoute;