import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/* 
React Bootstrap Configuration
*/
// import 'react-bootstrap/dist/react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './store/index';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
