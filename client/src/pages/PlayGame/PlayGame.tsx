import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../store/reducers/userSlice";

import { SLICE_NAMES } from "../../constants";

import { CustomButton, SimpleInput } from "../../components";

import { errorToast, successToast } from "../../lib/toast";

import { useScore } from "../../apis";

import { useLocalStorage } from "../../hooks";

import styles from "./PlayGame.module.scss";

const PlayGame = () => {
  const DISPATCH = useDispatch();
  const APP_USER = useSelector((state) => state[SLICE_NAMES.USER]);

  const navigate = useNavigate();

  const { getHighestScore, createScore, loading } = useScore();

  // highest
  const [highestScore, setHighestScore] = useLocalStorage("highest_score", {});

  const [guess, setGuess] = useState("");
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // function to generate a random number between 1 and 100
  function generateRandomNumber() {
    return Math.floor(Math.random() * 5) + 1;
  }

  const handleGuess = () => {
    const guessNumber = parseInt(guess);

    if (isNaN(guessNumber)) {
      setMessage("Please enter a valid number!");
      return;
    }

    // in between 1 to 5
    if (guessNumber < 1 || guessNumber > 5) {
      setMessage("Please enter a number between 1 and 5!");
      return;
    }

    if (guessNumber === randomNumber) {
      setMessage("Congratulations! You've guessed the number!");
      setScore((prevScore) => prevScore + 10);

      // check if it's a high score
      if (score + 10 > highestScore) {
        setHighestScore(score + 10);
      }

      handleScoreSubmit({
        score: score + 10,
      });
      setIsGameOver(true);
    } else if (guessNumber < randomNumber) {
      setMessage(`Too low! Try again. The number is ${randomNumber}`);
      setScore((prevScore) => prevScore - 1);
      // reset random
      setRandomNumber(generateRandomNumber());
    } else {
      setMessage(`Too high! Try again. The number is ${randomNumber}`);
      setScore((prevScore) => prevScore - 1);
      // reset random
      setRandomNumber(generateRandomNumber());
    }

    setGuess("");
  };
  const handlePlayAgain = () => {
    setRandomNumber(generateRandomNumber());
    setMessage("");
    setScore(0);
    setIsGameOver(false);
    setShowConfetti(false);
  };
  const handleFinishGame = () => {
    if (score) {
      handleScoreSubmit({
        score,
      });
    } else {
      errorToast("You need to play the game to finish it!");
    }
  };
  const handleScoreSubmit = ({ score }: { score: number }) => {
    createScore(
      {
        score,
      },
      (
        response: {
          data: {
            message: string;
          };
        },
        error: {
          message: string;
        },
      ) => {
        if (error) {
          console.log("Error submitting score: ", error);
        } else {
          successToast(
            response?.data?.message || "Score submitted successfully",
          );

          // if the score is higher than the current total
          if (score) {
            setShowConfetti(true);
          }

          fetchHighestScore();
        }
      },
    );
  };
  const handleLogout = () => {
    DISPATCH(logoutUser());
    navigate("/auth/login");
  };
  const fetchHighestScore = async () => {
    getHighestScore(
      (
        response: {
          data: {
            highest_score: {
              score: number;
            };
            total_score: {
              score: string;
            };
          };
        },
        error: {
          message: string;
        },
      ) => {
        if (error) {
          console.log("Error getting highest score: ", error);
        } else {
          // set local state
          setHighestScore(response?.data || {});
        }
      },
    );
  };

  useEffect(() => {
    if (APP_USER) {
      fetchHighestScore();
    }
  }, [isGameOver]);

  return (
    <div className={styles.pg}>
      <h1>Guess the Number!</h1>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
        />
      )}
      <div className={styles.scores}>
        <p className={styles.score1}>Your Score: {score}</p>
        <p className={styles.score2}>
          High Score: {highestScore?.highest_score?.score ?? 0}
        </p>
        <p className={styles.score3}>
          Total Score: {highestScore?.total_score?.score ?? 0}
        </p>
      </div>
      {isGameOver ? (
        <div className={styles.go}>
          <p className={styles.congo}>{message}</p>
          <div className={styles.actions}>
            <CustomButton className={styles.action} onClick={handlePlayAgain}>
              Play Again
            </CustomButton>
            <CustomButton
              className={styles.action}
              onClick={() => {
                navigate("/user/leaderboard");
              }}
            >
              Check Leaderboard
            </CustomButton>
          </div>
        </div>
      ) : (
        <div className={styles.actions_container}>
          <div className={styles.actions}>
            <SimpleInput
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter a number between 1-10"
            />
            <div className={styles.game_over}>
              <CustomButton
                onClick={handleFinishGame}
                className={styles.finish_game}
              >
                Finish Game
              </CustomButton>
              <CustomButton
                onClick={handleGuess}
                className={styles.guess_button}
              >
                {`${loading ? "Checking..." : "Guess Number"}`}
              </CustomButton>
            </div>
          </div>
          <p className={styles.info}>{message}</p>
        </div>
      )}
      <p
        className={styles.leaderboard}
        onClick={() => {
          navigate("/user/leaderboard");
        }}
      >
        Check the leaderboard to see where you stand among other players. Good
        luck!
      </p>
      <p className={styles.warning}>
        <strong>Note:</strong> The number is generated between 1 and 5
      </p>
      <p className={styles.logout} onClick={handleLogout}>
        {`Logout`}
      </p>
    </div>
  );
};

export default PlayGame;
