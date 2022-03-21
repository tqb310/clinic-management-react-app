import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { store } from './_app/store';
// import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {
    ThemeProvider,
    createTheme,
} from '@mui/material/styles';
import ThemeObject from './_constants/theme';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);
const theme = createTheme(ThemeObject);
ReactDOM.render(
    <React.StrictMode>
        {/* <Provider store={store}> */}
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
        {/* </Provider> */}
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
