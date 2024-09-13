import { useState } from "react";

import { axios_instance } from "../lib/axios";
import { errorToast } from "../lib/toast";

const useUser = () => {
  const [loading, setLoading] = useState(false);

  const getScores = async (callback: any) => {
    try {
      const response = await axios_instance.get("/score");
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(response?.data?.message || "Failed to get scores");
      }
      if (callback && typeof callback === "function") {
        callback(response?.data, null);
      }
    } catch (error) {
      callback(null, error);
    } finally {
      console.log(
        "Get scores request completed. This message is displayed regardless of success or failure.",
      );
    }
  };

  const getHighestScore = async (callback: any) => {
    try {
      const response = await axios_instance.get("/score/highest");
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(response?.data?.message || "Failed to get highest score");
      }
      if (callback && typeof callback === "function") {
        callback(response?.data, null);
      }
    } catch (error) {
      callback(null, error);
    } finally {
      console.log(
        "Get highest score request completed. This message is displayed regardless of success or failure.",
      );
    }
  };

  const getLeaderboard = async (callback: any) => {
    try {
      const response = await axios_instance.get("/score/leaderboard");
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(response?.data?.message || "Failed to get leaderboard");
      }
      if (callback && typeof callback === "function") {
        callback(response?.data, null);
      }
    } catch (error) {
      callback(null, error);
    } finally {
      console.log(
        "Get leaderboard request completed. This message is displayed regardless of success or failure.",
      );
    }
  };

  const createScore = async (
    payload: {
      score: number;
    },
    callback: any,
  ) => {
    try {
      const response = await axios_instance.post("/score", payload);
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(response?.data?.message || "Failed to create score");
      }
      if (callback && typeof callback === "function") {
        callback(response?.data, null);
      }
    } catch (error) {
      callback(null, error);
    } finally {
      console.log(
        "Create score request completed. This message is displayed regardless of success or failure.",
      );
    }
  };

  return {
    loading,
    getScores,
    getHighestScore,
    getLeaderboard,
    createScore,
  };
};

export default useUser;
