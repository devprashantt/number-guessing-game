import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SLICE_NAMES } from "../../constants";

import { CustomButton } from "../../components";

import { useScore } from "../../apis";

import { useLocalStorage } from "../../hooks";

import styles from "./Leaderboard.module.scss";

const Leaderboard = () => {
  const DISPATCH = useDispatch();
  const APP_USER = useSelector((state) => state[SLICE_NAMES.USER]);

  const navigate = useNavigate();

  const { getHighestScore, getLeaderboard } = useScore();

  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    getLeaderboard((res, error) => {
      if (error) {
        console.log(error);
        return;
      }

      setLeaderboard(res?.data || []);
    });
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className={styles.main}>
      <h1>Leaderboard</h1>
      <div className={styles.leaderboard}>
        {leaderboard.map(
          (
            userData: {
              user_id: string;
              total_score: number;
              User: {
                first_name: string;
                primary_email: string;
              };
            },
            index,
          ) => (
            <div key={index} className={styles.leaderboard_item}>
              <div>
                <span>{index + 1}.</span>
                <span>
                  {userData.User.first_name} ({userData.User.primary_email})
                </span>
              </div>
              <div>{userData.total_score}</div>
            </div>
          ),
        )}
      </div>
      <CustomButton
        onClick={() => {
          navigate("/");
        }}
      >
        Go Back
      </CustomButton>
    </div>
  );
};

export default Leaderboard;
