import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const pages = [
    { path: '/', name: 'Home' },
    { path: '/login', name: 'Login' },
    { path: '/signup', name: 'Signup' },
    { path: '/account', name: 'Account' }
  ];
  const currentIndex = pages.findIndex(p => p.path === location.pathname);
  const currentPage = pages[currentIndex] || { name: 'Unknown' };

  const handleHome = () => {
    navigate('/');
  };

  const handleLeft = () => {
    if (currentIndex > 0) {
      navigate(pages[currentIndex - 1].path);
    }
  };

  const handleRight = () => {
    if (currentIndex < pages.length - 1) {
      navigate(pages[currentIndex + 1].path);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 p-4 bg-white border-t border-neutral-300">
      <button
        onClick={handleHome}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </button>
      <button
        onClick={handleLeft}
        disabled={currentIndex <= 0}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <span className="text-sm font-medium text-neutral-700">{currentIndex + 1} of {pages.length}</span>
      <button
        onClick={handleRight}
        disabled={currentIndex >= pages.length - 1}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default Footer;