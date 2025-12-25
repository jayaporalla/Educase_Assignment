import React from "react";
import { Link } from "react-router-dom";

const buttonBase =
  "w-full rounded-md px-4 py-3 text-sm text-center font-semibold duration-200 cursor-pointer";

function Home() {
  return (
    <div className="flex flex-col justify-end h-full gap-4 px-6 py-14">
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] font-bold leading-none text-neutral-900">
          Welcome to PopX
        </h1>
        <p className="text-base text-neutral-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Link
          to="/signup"
          className={`${buttonBase} bg-[#6c25ff] text-white hover:bg-violet-900`}
        >
          Create Account
        </Link>

        <Link
          to="/login"
          className={`${buttonBase} bg-[#cebafb] text-violet-900 hover:bg-violet-500 hover:text-white`}
        >
          Already Registered? Login
        </Link>
      </div>
    </div>
  );
}

export default Home;
