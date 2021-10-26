import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

//Fake user data storage
const currentUser = {name: 'Bao', role: 'manager', jwt: '1234'};
const Unauthorized = () => (<div>Tài khoản của bạn không có quyền truy cập trang này</div>)

function PrivateRoute({component: Component, roles, ...rest}) {
    return (
       <Route {...rest} render={
           (props) => {
               if(!currentUser){
                   return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
               }

               if(roles && roles.localeCompare(currentUser.role)){
                   return <Unauthorized {...props}/>
               }

               return <Component {...props}/>
           }
       }/>      
    )
}

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string,
    roles: PropTypes.string,    
}

export default PrivateRoute

