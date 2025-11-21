import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PostPage from "../../pages/PostPage";

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PostPage />} />
          <Route path="/dashboard/general-announcements" element={<PostPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppWrapper;