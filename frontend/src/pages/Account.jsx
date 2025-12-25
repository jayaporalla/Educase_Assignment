import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          toast.error(data.message || "Failed to fetch profile");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } catch (error) {
        toast.error("Network error");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 text-neutral-600">
      <h2 className="px-5 py-6 text-lg font-semibold tracking-tight text-neutral-800 shadow bg-white">
        Account Settings
      </h2>

      <div className="flex flex-col gap-5 p-5 text-sm text-neutral-700 border-b border-dashed border-neutral-300">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user.avatar}
              alt="Profile"
              className="object-cover w-16 h-16 rounded-full"
            />
            <div className="absolute bottom-0 right-0 bg-violet-600 rounded-full p-1 border">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{user.fullName}</span>
            <span>{user.email}</span>
          </div>
        </div>

        <p>{user.bio}</p>
      </div>
    </div>
  );
}

export default Account;
