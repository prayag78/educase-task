import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex flex-col h-[95vh] justify-end">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Welcome to PopX</h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit,
        </p>

        <Link
          to="/signup"
          className="block w-full font-bold text-center py-3 focus:ring-[#6C25FF] text-white rounded-lg"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
