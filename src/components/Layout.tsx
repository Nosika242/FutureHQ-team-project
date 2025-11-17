import React, { useState } from 'react';
import { User } from '../services/api';
import Header from './Header';
import Sidebar from './Sidebar';
import ArticleDetail from './ArticleDetail';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
}

const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleArticleSelect = (article: any) => {
    setSelectedArticle(article);
  };

  const handleCloseDetail = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header 
        user={user} 
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar onArticleSelect={handleArticleSelect} />
        </div>
        
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <Sidebar 
                onArticleSelect={handleArticleSelect}
                onClose={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}
        
        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          </main>
          
          {/* Right Sidebar - Article Detail */}
          {selectedArticle && (
            <div className="hidden xl:block w-96 bg-white border-l border-gray-200 overflow-y-auto">
              <ArticleDetail 
                article={selectedArticle} 
                onClose={handleCloseDetail}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;