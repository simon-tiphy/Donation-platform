import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './index.css';

// Get the root element
const container = document.getElementById('root');
const root = createRoot(container); // Create a root

// Render the app
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);