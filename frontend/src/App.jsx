import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./pages/Footer";

function App() {
  return (
    <div className="h-screen w-screen flex justify-center">
      <div className="flex flex-col h-screen w-[375px] border border-neutral-300 bg-[#f7f8f9]">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
      <ToastContainer position="top-right"/>
    </div>
  );
}

export default App;
