import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
    setMeAsync,
    removeMe,
    setMe,
} from '_redux/slice/currentUserSlice';
import {auth} from '_services/firebase/app';
import {onAuthStateChanged} from 'firebase/auth';
// import {useHistory} from 'react-router-dom';
// import {useSelector} from 'react-redux';

function Auth({children}) {
    const dispatch = useDispatch();

    //Set role when logging in
    const role = localStorage.getItem('role');
    if (role) dispatch(setMe({role: parseInt(role)}));

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            async user => {
                if (user) {
                    await dispatch(setMeAsync(user.uid));
                } else {
                    localStorage.removeItem('role');
                    dispatch(removeMe());
                }
            },
        );

        return unsubscribe;
    }, []);
    return <>{children}</>;
}

export default Auth;
