import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const disabled = !email || !password || loading;

  const navigate = useNavigate();

  const HandleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://educase-assignment-ywqz.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/account");
        toast.success("Login successful! 🎉");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 px-6 py-9">
      <div className="flex flex-col gap-6">
        <h1 className="text-[28px] font-bold leading-none text-neutral-900">
          Sign in to your PopX account
        </h1>
        <p className="text-base text-neutral-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="relative w-full">
          <label className="absolute left-5 top-0 -translate-y-1/2 bg-[#f7f8f9] px-1 text-xs font-semibold text-[#6c25ff]">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-md border border-neutral-400 p-2 focus:outline-none"
          />
        </div>

        <div className="relative w-full">
          <label className="absolute left-5 top-0 -translate-y-1/2 bg-[#f7f8f9] px-1 text-xs font-semibold text-[#6c25ff]">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-md border border-neutral-400 p-2 focus:outline-none"
          />
        </div>

        <button
          disabled={disabled}
          onClick={HandleLogin}
          className={`w-full rounded-md px-4 py-3 text-sm font-semibold ${
            disabled
              ? "cursor-not-allowed bg-neutral-400 text-white"
              : "bg-[#cebafb] text-violet-900 hover:bg-violet-500 hover:text-white duration-200 cursor-pointer"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
