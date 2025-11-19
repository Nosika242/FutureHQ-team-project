
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PostProvider } from './context/PostContext';
import './index.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PostProvider>
      <App /> 
    </PostProvider>
  </React.StrictMode>,
);