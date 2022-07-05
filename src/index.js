import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {store} from './_redux/store';
import {Provider} from 'react-redux';
import {
    ThemeProvider,
    createTheme,
} from '@mui/material/styles';
import ThemeObject from './_constants/theme';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import LaunchLottie from '_components/core/LaunchLottie';

library.add(fas, far, fab);
const theme = createTheme(ThemeObject);
ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <LaunchLottie>
                <App />
            </LaunchLottie>
        </ThemeProvider>
    </Provider>,
    // </React.StrictMode>
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
