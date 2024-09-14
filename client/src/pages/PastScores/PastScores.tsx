import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SLICE_NAMES } from "../../constants";

import { CustomButton } from "../../components";

import { useScore } from "../../apis";

import { useLocalStorage } from "../../hooks";

import styles from "./PastScores.module.scss";

const PastScores = () => {
  const DISPATCH = useDispatch();
  const APP_USER = useSelector((state) => state[SLICE_NAMES.USER]);

  const navigate = useNavigate();

  const { getHighestScore, getLeaderboard, loading, getAllScores } = useScore();

  const [scores, setScores] = useState([]);

  const fetchAllScores = async () => {
    getAllScores((res, error) => {
      if (error) {
        console.log(error);
        return;
      }

      setScores(res?.data || []);
    });
  };

  useEffect(() => {
    fetchAllScores();
  }, []);

  return (
    <div className={styles.main}>
      <h1>User Scores</h1>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <div className={styles.leaderboard}>
          {scores?.map(
            (
              res: {
                user_id: string;
                score: number;
                User: {
                  first_name: string;
                  primary_email: string;
                };
              },
              index,
            ) => (
              <div key={index} className={styles.leaderboard_item}>
                <p>{res.User.first_name}</p>
                <p>
                  {
                    // format date
                    new Date(res?.created_at).toLocaleDateString()
                  }
                </p>
                <p>{res.score}</p>
              </div>
            ),
          )}
        </div>
      )}
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

export default PastScores;
