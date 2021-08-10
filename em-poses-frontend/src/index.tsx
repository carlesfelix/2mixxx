import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GuestAuthProvider } from './contexts/guest-auth';
import { MeProvider } from './contexts/me';
import environment from './environment';
import reportWebVitals from './reportWebVitals';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={environment.REACT_APP_AUTH0_DOMAIN}
      clientId={environment.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <GuestAuthProvider>
        <MeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MeProvider>
      </GuestAuthProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
