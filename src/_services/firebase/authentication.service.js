import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from './app';

const authentication = {
    async login(email, password) {
        return signInWithEmailAndPassword(
            auth,
            email,
            password,
        );
    },
};

export default authentication;
