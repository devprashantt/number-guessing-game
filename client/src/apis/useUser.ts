import { useState } from "react";

import { axios_instance } from "../lib/axios";
import { errorToast } from "../lib/toast";

const useUser = () => {
  const [loading, setLoading] = useState(false);

  const getUserDetails = async (callback: any) => {
    try {
      const response = await axios_instance.get("/user");
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(response?.data?.message || "Failed to get user details");
      }
      if (callback && typeof callback === "function") {
        callback(response?.data, null);
      }
    } catch (error) {
      callback(null, error);
    } finally {
      console.log(
        "Get user request completed. This message is displayed regardless of success or failure.",
      );
    }
  };

  const login = async (payload: any, callback: any) => {
    setLoading(true);
    try {
      const response = await axios_instance.post("/user/auth/login", payload);
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message || "Failed to login. Please try again.",
        );
      }
      if (callback && typeof callback === "function") {
        callback(response?.data, null);
      }
    } catch (error) {
      callback(null, error);
    } finally {
      setLoading(false);
      console.log(
        "Login request completed. This message is displayed regardless of success or failure.",
      );
    }
  };

  const register = async (payload: any, callback: any) => {
    setLoading(true);
    try {
      const response = await axios_instance.post("/user", payload);
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message || "Failed to register. Please try again.",
        );
      }
      if (callback && typeof callback === "function") {
        callback(response?.data, null);
      }
    } catch (error) {
      callback(null, error);
    } finally {
      setLoading(false);
      console.log(
        "Registration request completed. This message is displayed regardless of success or failure.",
      );
    }
  };

  const getUserToken = async (callback: any) => {
    setLoading(true);
    try {
      const response = await axios_instance.get("/user_token");
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message ||
            "Failed to get user token. Please try again.",
        );
      }
      if (callback && typeof callback === "function") {
        callback(response?.data, null);
      }
    } catch (error) {
      callback(null, error);
    } finally {
      setLoading(false);
      console.log(
        "Get user token request completed. This message is displayed regardless of success or failure.",
      );
    }
  };

  const updateTokens = async (payload: any, callback: any) => {
    setLoading(true);
    try {
      const response = await axios_instance.put("/user_token", payload);
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message ||
            "Failed to update tokens. Please try again.",
        );
      }
      if (callback && typeof callback === "function") {
        callback(response?.data, null);
      }
    } catch (error) {
      callback(null, error);
    } finally {
      setLoading(false);
      console.log(
        "Update tokens request completed. This message is displayed regardless of success or failure.",
      );
    }
  };

  const updateUser = async (payload: any, callback: any) => {
    setLoading(true);
    try {
      const response = await axios_instance.put("/user", payload);
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message ||
            "Failed to update user details. Please try again.",
        );
      }
      if (callback && typeof callback === "function") {
        callback(response?.data, null);
      }
    } catch (error) {
      callback(null, error);
    } finally {
      setLoading(false);
      console.log(
        "Update user request completed. This message is displayed regardless of success or failure.",
      );
    }
  };

  return {
    loading,
    getUserDetails,
    login,
    register,
    getUserToken,
    updateTokens,
    updateUser,
  };
};

export default useUser;
