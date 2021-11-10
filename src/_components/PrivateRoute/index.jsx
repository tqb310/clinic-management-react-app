import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import authentication from '_services/authentication.service';
import PropTypes from 'prop-types';

//Fake user data storage
//const currentUser = {name: 'Bao', role: '1', jwt: '1234'};
const Unauthorized = () => (<div>Tài khoản của bạn không có quyền truy cập trang này</div>)

function PrivateRoute({component: Component, roles, ...rest}) {
    return (
       <Route {...rest} render={
           (props) => {
               if(!authentication.getCurrentUser()){
                   return <Redirect to={{pathname: '/dang-nhap', state: {from: props.location}}}/>
               }

               if(roles && roles.localeCompare(authentication.getCurrentUser().payload.role)){
                   return <Unauthorized {...props}/>
               }

               return <Component {...props}/>
           }
       }/>      
    )
}

PrivateRoute.propTypes = {
    component: PropTypes.object.isRequired,
    path: PropTypes.string,
    roles: PropTypes.string,    
}

export default PrivateRoute

