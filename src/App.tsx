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

  return (
    <>
      <TailwindTest />
    </>
  )
}

export default App
