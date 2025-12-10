
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default Layout;
