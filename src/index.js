import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { makeServer } from './server';
import { BrowserRouter as Router } from 'react-router-dom';
import { PostProvider } from './context/Post-context';
import { UserProvider } from './context/User-context';
import { ModalProvider } from './context/Modal-context';
import { store } from '../src/redux-store/store';
import { Provider } from 'react-redux';
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ModalProvider>
          <UserProvider>
            <PostProvider>
              <App />
            </PostProvider>
          </UserProvider>
        </ModalProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
