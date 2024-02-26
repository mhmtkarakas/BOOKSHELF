import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer 
    style={{
      background: '#007aff', // Arka plan rengi
      color: '#ffffff', // Metin rengi
      fontSize: '16px' // Metin boyutu
    }}
     />
  </Provider>
);


