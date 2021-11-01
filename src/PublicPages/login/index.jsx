import React, {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import authentication from '_services/authentication.service';
import role from '_constants/role'
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
        const data = await authentication.login(username, password)
        switch(data){
            case null:console.log("null");break;
            case 1:alert('Username không đúng!');break;
            case 2:alert('Password không đúng!');break;
            case 3:alert('Lỗi server, vui lòng thử lại!');break;
            default:history.replace(role.get(data.role).url);
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

