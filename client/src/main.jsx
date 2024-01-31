import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App'
import AppProvider from './context/appContext/AppProvider';
import SocketProvider from './context/socketContext/SocketProvider';
import moment from 'moment';
import 'moment/dist/locale/es';
import '../styles/main.scss';

moment.locale('es');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </SocketProvider>
  </React.StrictMode>
)
