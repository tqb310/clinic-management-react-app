import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import authentication from '_services/authentication.service';
import role from '_constants/role'
import doctorImage from 'PublicPages/login/assets/doctor.png'
import hopitalImage from 'PublicPages/login/assets/hopital.png'
import {
    CardMedia,
    Typography,
    Button,
    IconButton,   
    InputAdornment
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import TextField from './TextField'
import './index.scss'
//import PropTypes from 'prop-types';

function Login(props) {
    const history = useHistory();
    //state
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    useEffect(() => {
        const user = authentication.getCurrentUser()?.payload
        if(user){
            history.replace(role.get(user.role).url);
        }        
    }, [])
    const login = async()=>{
        const status = await authentication.login(username, password)
        const user = authentication.getCurrentUser()?.payload
        switch(status){
            case null:console.log("null");break;
            case 1:alert('Username không đúng!');break;
            case 2:alert('Password không đúng!');break;
            case 3:alert('Lỗi server, vui lòng thử lại!');break;
            default:
                if(user !== undefined)
                    history.replace(role.get(user.role).url);
                else
                alert('Lỗi server, vui lòng thử lại!')

        
        }
    }

    const toggleShowPass = () => {
        setShowPass(!showPass)
    }
    return (
        <div className='login-container'>
            <div className='login-left'>
                <CardMedia component='img' src={doctorImage} style={{
                    width: 300,
                    height: 300,
                }}></CardMedia>
            </div>
            <div className='login-right'>
                <div className='login-right-logo'>
                    <CardMedia component='img' src={hopitalImage} style={{
                        width: 50,
                        height: 50,
                    }}></CardMedia>
                    <div className='login-right-logo-name'>
                        <Typography variant="h6" color="initial" style={{ color: '#2E3192', fontWeight: '700' }}>Phòng khám</Typography>
                        <Typography variant="h6" color="initial" style={{ color: '#2E3192', fontWeight: '700' }}>MINH ANH</Typography>
                    </div>
                </div>
                <div className='login-form'>
                    <Typography variant="body1" color="initial" style={{
                        marginBottom: '1.5rem',
                        color: '#2E3192',
                        fontWeight: '700'
                    }}
                    >ĐĂNG NHẬP</Typography>
                    <div className='login-textfield'>
                        <TextField
                            style={{
                                width: '100%',
                            }}
                            placeholder="Eg:abcd@gmail.com"
                            id=""
                            label="Tên đăng nhập"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}

                        />
                    </div>
                    <div className='login-textfield'>
                        <TextField
                            label="Mật Khẩu"
                            type={showPass ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                size: 'large'
                            }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={toggleShowPass}
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPass ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>,
                            }}
                        />
                    </div>
                    <Button variant="contained" color="primary" onClick={login} style={{ width: '70%' }}>
                        Đăng Nhập
                    </Button>
                </div>
            </div>
        </div>

    )
}

Login.propTypes = {

}

export default Login

