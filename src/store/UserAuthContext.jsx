// UserAuthContext.jsx
import React, { createContext, useState, useContext } from "react";

// Create a context
const UserAuthContext = createContext();

// Custom hook to access the context
export const useUserAuth = () => useContext(UserAuthContext);

// Provider component to wrap the app and manage user authentication state
export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserByUsername = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/username/${username}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      setUser(userData);
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Function to generate OTP
  const generateOTP = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/generateOTP?username=${username}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to generate OTP");
      }
      const otpData = await response.text();
      setOtp(otpData);
      return otpData;
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to validate OTP for a given username
  const validateOTP = async (username, otp) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/validateOTP?username=${username}&otp=${otp}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to validate OTP");
      }
      return response.text();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateUserPassword = async (userId, newPassword) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}/updatePassword?newPassword=${encodeURIComponent(
          newPassword
        )}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update password");
      }

      return await response.text();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Clear error message
  const clearError = () => setError(null);

  // Value to be provided by the context
  const contextValue = {
    user,
    otp,
    error,
    fetchUserByUsername,
    generateOTP,
    validateOTP,
    updateUserPassword,
    clearError,
  };

  return (
    <UserAuthContext.Provider value={contextValue}>
      {children}
    </UserAuthContext.Provider>
  );
};
