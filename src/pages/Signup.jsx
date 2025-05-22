import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full: "",
    phone: "",
    email: "",
    pass: "",
    company: "",
  });
  const [agency, setAgency] = useState("no");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({
    full: false,
    phone: false,
    email: false,
    pass: false,
    company: false,
  });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validatePhone = (phone) => {
    return String(phone).match(/^[0-9]{10}$/);
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
      full: !formData.full,
      phone: !validatePhone(formData.phone),
      email: !validateEmail(formData.email),
      pass: formData.pass.length < 6,
      company: !formData.company,
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
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", formData.email);

      const hashedPassword = btoa(formData.pass);
      localStorage.setItem("userPassword", hashedPassword);

      localStorage.setItem("isAgency", agency);

      navigate("/account");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex-1 p-6 space-y-6 overflow-y-auto"
      >
        <h1 className="text-2xl font-bold">
          Create your
          <br /> PopX account
        </h1>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        <div className="space-y-4">
          <TextField
            required
            size="small"
            label="Full Name"
            name="full"
            value={formData.full}
            onChange={handleChange}
            error={formErrors.full}
            helperText={formErrors.full ? "Full name is required" : ""}
          />

          <TextField
            required
            size="small"
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={formErrors.phone}
            helperText={
              formErrors.phone
                ? "Please enter a valid 10-digit phone number"
                : ""
            }
          />

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
            name="pass"
            type="password"
            value={formData.pass}
            onChange={handleChange}
            error={formErrors.pass}
            helperText={
              formErrors.pass ? "Password must be at least 6 characters" : ""
            }
          />

          <TextField
            size="small"
            label="Company Name"
            name="company"
            value={formData.company}
            onChange={handleChange}
            error={formErrors.company}
            helperText={formErrors.company ? "Company name is required" : ""}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#6C25FF]">Are you an Agency?*</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="agency"
                value="yes"
                checked={agency === "yes"}
                onChange={() => setAgency("yes")}
                className="w-4 h-4 accent-[#6C25FF]"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="agency"
                value="no"
                checked={agency === "no"}
                onChange={() => setAgency("no")}
                className="w-4 h-4 accent-[#6C25FF]"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#6C25FF] text-white rounded-lg hover:bg-[#5a1fe6] transition-colors font-bold"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
