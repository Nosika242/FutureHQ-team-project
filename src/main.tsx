// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


// src/main.tsx or App.tsx (Simplified)
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