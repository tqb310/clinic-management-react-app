import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import authentication from '_services/authentication.service';
//import PropTypes from 'prop-types';

function Login(props) {
    const history = useHistory();    
    useEffect(() => {
        if(authentication.getCurrentUser()?.token){
            history.replace('/tiep-tan');
        }        
    }, [])
    return (
        <div>
            Login
            <button onClick={() => authentication.login("abc@email.com", "123")}>Login</button> 
        </div>
    )
}

Login.propTypes = {

}

export default Login

