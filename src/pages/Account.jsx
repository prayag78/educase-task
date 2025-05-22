import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import profile from "../assets/profile.png";

const Account = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    setEmail(userEmail || "");
    setName(userName || "");
  }, [navigate]);

  return (
    <div className="h-[95vh] shadow-lg bg-gray-200/80">
      <div className="h-[70px] bg-white px-8 py-4">
        <h1 className="capitalize text-gray-600 text-2xl font-medium ">
          account settings
        </h1>
      </div>
      <div className="flex gap-4 px-[38px] py-4">
        <div className="relative">
          <FaCamera className="bg-[#6C25FF] absolute right-0 bottom-0 text-2xl cursor-pointer" />
          <img
            src={profile}
            alt="Profile"
            className="w-20 h-20 rounded-full object-contain"
          />
        </div>
        <div>
          <p className="capitalize font-medium">
            <strong>{name}</strong>
          </p>
          <p className="capitalize font-medium text-gray-600">{email}</p>
        </div>
      </div>
      <p className="px-2 text-gray-600 text-sm leading-relaxed">
        Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy
        Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
      </p>

      <div className="border-t border-dashed border-gray-400 my-4 mx-2"></div>
    </div>
  );
};

export default Account;
