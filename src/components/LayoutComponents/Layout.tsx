import React, { useState } from "react";
import type { ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      <aside className="row-span-2 bg-gray-100 ">
        <Sidebar isOpen={sidebarOpen} />
      </aside>

      <header className="col-start-2 bg-white">
        <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
      </header>

      <main className="">{children}</main>
    </div>
  );
};

export default Layout;
