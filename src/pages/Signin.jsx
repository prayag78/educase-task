import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const validateForm = () => {
    const errors = {
      email: !validateEmail(formData.email),
      password: formData.password.length < 6,
    };

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      setError("Please fill all required fields correctly");
      return;
    }

    try {
      const storedEmail = localStorage.getItem("userEmail");
      const storedPassword = localStorage.getItem("userPassword");

      if (
        storedEmail === formData.email &&
        storedPassword === btoa(formData.password)
      ) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/account");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex-1 p-6 space-y-6 overflow-y-auto"
      >
        <h1 className="text-2xl font-bold">
          Signin to your
          <br />
          PopX account
        </h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit,
        </p>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        <div className="space-y-4">
          <TextField
            required
            size="small"
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            helperText={
              formErrors.email ? "Please enter a valid email address" : ""
            }
          />

          <TextField
            required
            size="small"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            helperText={
              formErrors.password
                ? "Password must be at least 6 characters"
                : ""
            }
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#6C25FF] text-white rounded-lg hover:bg-[#5a1fe6] transition-colors font-bold"
        >
          Login
        </button>
        
      </form>
    </div>
  );
};

export default Signin;
