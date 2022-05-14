import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { makeServer } from './server';
import { BrowserRouter as Router } from 'react-router-dom';
import { PostProvider } from './context/Post-context';
import { UserProvider } from './context/User-context';
import { ModalProvider } from './context/Modal-context';
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ModalProvider>
        <UserProvider>
          <PostProvider>
            <App />
          </PostProvider>
        </UserProvider>
      </ModalProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
