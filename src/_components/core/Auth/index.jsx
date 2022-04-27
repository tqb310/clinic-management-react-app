import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setCurrentUser} from '_redux/slice/currentUserSlice';
import {auth} from '_services/firebase/app';
import {onAuthStateChanged} from 'firebase/auth';
import {useHistory} from 'react-router-dom';

function Auth({children}) {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            user => {
                if (!user) history.replace('/dang-nhap');
                dispatch(setCurrentUser(user));
            },
        );

        return unsubscribe;
    }, []);
    return <div>{children}</div>;
}

export default Auth;
