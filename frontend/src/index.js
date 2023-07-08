import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {Provider} from 'react-redux'
import {store} from "./store"
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
    <Provider store={store}>
    <GoogleOAuthProvider clientId="1024388664235-mtf12l3bt745febe74un1jbmtlo5itfu.apps.googleusercontent.com">
    <App />
     </GoogleOAuthProvider>
    </Provider>
    
    </BrowserRouter>
 

);


