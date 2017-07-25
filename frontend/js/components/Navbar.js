import React, { Component, PropTypes } from 'react'
import LoginNav from './LoginNav'
import Logout from './buttons/Logout'
import { loginUser, logoutUser, handleLoginError } from '../actions/auth'
import Users from "./buttons/Users";

export default class Navbar extends Component {
  
  render() {
    const {
      dispatch,
      isAuthenticated,
      loginErrorMessage,
      role } = this.props;
    
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <a className="navbar-brand" href="#">Ideas Pipeline</a>
           <div className='navbar-form text-right'>

             {!isAuthenticated &&
             <LoginNav
               errorMessage={loginErrorMessage}
               onLoginClick={ creds => dispatch(loginUser(creds)) }
               onLoginError={ message => dispatch(handleLoginError(message)) }
               dispatch={ dispatch }
             />
             }

             { (role === 'ROLE_ADMIN' || role === 'ROLE_USER_MANAGER') &&
             <span>
               <Users />
             </span>
             }

             {isAuthenticated &&
               <Logout onLogoutClick={() => dispatch(logoutUser())} />
             }
         
         </div>
       </div>
     </nav>
    )
  }

}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loginErrorMessage: PropTypes.string,
  role: PropTypes.string.isRequired
};