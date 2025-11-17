<<<<<<< HEAD
import CommentLayout from './pages/CommentLayout';
import PostPage from './pages/PostPage';
=======
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser, User } from './services/api';

// Componentsgitn
import Layout from './components/Layout';
import AnnouncementsPage from './components/pages/AnnouncementsPage';
import ClassroomPage from './components/pages/ClassroomPage';
import CommunitiesPage from './components/pages/CommunitiesPage';
import ProjectsPage from './components/pages/ProjectsPage';
import DirectMessagesPage from './components/pages/DirectMessagesPage';
import LoadingSpinner from './components/LoadingSpinner';

import './App.css';

function App() {
>>>>>>> c37afe649b32a428d58c36248d5f7c38dee97aaa

  return (
<<<<<<< HEAD
    <div>
      <PostPage />
      <CommentLayout/>
    </div>
  );
=======
    <>
      <TailwindTest />
    </>
  )
>>>>>>> c37afe649b32a428d58c36248d5f7c38dee97aaa
}

export default App
