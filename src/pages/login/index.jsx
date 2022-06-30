import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import role from '_constants/role';
import doctorImage from '_assets/images/banner.gif';
import clinic from '_assets/images/clinic.png';
import authentication from '_services/firebase/authentication.service';
import {useSelector} from 'react-redux';
// import {useSelector} from 'react-redux';
import {
    CardMedia,
    Typography,
    // Button,
    IconButton,
    InputAdornment,
    Alert,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import TextField from './TextField';
import {LoadingButton} from '@mui/lab';
import './index.scss';
//import PropTypes from 'prop-types';

const authCode = {
    'auth/wrong-password':
        'Sai mật khẩu. Vui lòng nhập lại!',
    'auth/user-not-found': 'Tài khoản không tồn tại',
    'auth/invalid-email': 'Email không hợp lệ',
};

function Login(props) {
    const history = useHistory();
    const currentUser = useSelector(
        state => state.user.current,
    );

    useEffect(() => {
        if (currentUser)
            history.replace(role.get(currentUser.role).url);
    }, [currentUser, history]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [authError, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const login = async () => {
        try {
            setLoading(true);
            await authentication.logIn(email, password);
        } catch (error) {
            setError(authCode[error.code]);
        } finally {
            setLoading(false);
        }
    };

    const toggleShowPass = () => {
        setShowPass(!showPass);
    };
    return (
        <div className="login-container">
            <div className="login-left">
                <CardMedia
                    component="img"
                    src={doctorImage}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                ></CardMedia>
            </div>
            <div className="login-right">
                <div className="login-right-logo">
                    <CardMedia
                        component="img"
                        src={clinic}
                        style={{
                            width: 50,
                            height: 50,
                        }}
                    ></CardMedia>
                    <div className="login-right-logo-name">
                        <Typography
                            variant="h6"
                            color="initial"
                            style={{
                                color: '#2E3192',
                                fontWeight: '700',
                            }}
                        >
                            Phòng khám
                        </Typography>
                        <Typography
                            variant="h6"
                            color="initial"
                            style={{
                                color: '#2E3192',
                                fontWeight: '700',
                            }}
                        >
                            QUỐC BẢO
                        </Typography>
                    </div>
                </div>
                <div className="login-form">
                    <Typography
                        variant="body1"
                        color="initial"
                        style={{
                            marginBottom: '1.5rem',
                            color: '#2E3192',
                            fontWeight: '700',
                        }}
                    >
                        ĐĂNG NHẬP
                    </Typography>
                    {authError && (
                        <Alert
                            severity="error"
                            sx={{width: '70%', mb: 3}}
                        >
                            {authError}
                        </Alert>
                    )}
                    <div className="login-textfield">
                        <TextField
                            style={{
                                width: '100%',
                            }}
                            placeholder="Eg:abcd@gmail.com"
                            id=""
                            label="Tên đăng nhập"
                            value={email}
                            onChange={e =>
                                setEmail(e.target.value)
                            }
                        />
                    </div>
                    <div className="login-textfield">
                        <TextField
                            label="Mật Khẩu"
                            type={
                                showPass
                                    ? 'text'
                                    : 'password'
                            }
                            value={password}
                            onChange={e =>
                                setPassword(e.target.value)
                            }
                            style={{
                                width: '100%',
                                size: 'large',
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={
                                                toggleShowPass
                                            }
                                            edge="end"
                                        >
                                            {showPass ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <LoadingButton
                        onClick={login}
                        loading={loading}
                        variant="contained"
                        sx={{width: '70%'}}
                    >
                        Đăng Nhập
                    </LoadingButton>
                </div>
            </div>
        </div>
    );
}

Login.propTypes = {};

export default Login;
