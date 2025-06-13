// import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="fixed md:relative left-0 top-0 h-screen z-50">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1  md:ml-64">
        <main className="p-4 md:p-6 bg-[#FBFBFB] min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
