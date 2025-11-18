
import React from "react";
import type { ReactNode } from "react";
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1" >
          {React.Children.map(children, (child) =>
            React.isValidElement(child) && child
          )}
        </main>
        
      </div>
    </div>
  );
};

export default Layout;