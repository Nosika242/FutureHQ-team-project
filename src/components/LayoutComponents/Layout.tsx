import React, { useState } from "react";
import type { ReactNode } from "react";
import Navbar from './navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen grid overflow-hidden">
      <aside className="row-span-2 bg-gray-100 hidden md:block">
        <Sidebar isOpen={sidebarOpen} />
      </aside>

      <header className="col-start-2 bg-white">
        <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
      </header>

      <main className="col-start-2 overflow-y-auto bg-white">
        {children}
      </main>

    </div>
  );
};

export default Layout;