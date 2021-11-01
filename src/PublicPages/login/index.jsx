import React, {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import authentication from '_services/authentication.service';
//import PropTypes from 'prop-types';

function Login(props) {
    const history = useHistory();
    //state
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    useEffect(() => {
        if(authentication.getCurrentUser()?.token){
            history.replace('/tiep-tan');
        }        
    }, [])
    const login = async()=>{
        if(await authentication.login(username, password)){
            history.replace('/tiep-tan');
        }
    }
    return (
        <div>
            <input 
                type="text"
                value={username}
                onChange = {(e)=>setUsername(e.target.value)}
            ></input><br/>
            <input 
                type="password"
                value={password}
                onChange = {(e)=>setPassword(e.target.value)}
            ></input><br/>
            <button onClick={login}>Login</button> 
        </div>
    )
}

Login.propTypes = {

}

export default Login

