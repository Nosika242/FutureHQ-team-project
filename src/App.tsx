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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to load user:', error);
        // For demo purposes, create a mock user
        setUser({
          id: 1,
          username: 'olivia.rhye',
          email: 'olivia.rhye@example.com',
          first_name: 'Olivia',
          last_name: 'Rhye',
          profile: {
            id: 1,
            avatar: undefined
          }
        });
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Router>
      <div className="App min-h-screen bg-neutral-50">
        <Layout user={user}>
          <Routes>
            <Route path="/" element={<Navigate to="/announcements" replace />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/classroom" element={<ClassroomPage />} />
            <Route path="/communities" element={<CommunitiesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/messages" element={<DirectMessagesPage />} />
            <Route path="*" element={<Navigate to="/announcements" replace />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;