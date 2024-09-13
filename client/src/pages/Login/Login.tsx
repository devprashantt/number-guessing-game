import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useUser } from "../../apis";

import { errorToast } from "../../lib/toast";

import { setUser } from "../../store/reducers/userSlice";

import { CustomButton } from "../../components";

import { Eye, EyeSlash } from "../../icons";

// @ts-ignore
import styles from "./Login.module.scss";

const Login = () => {
  const [loginData, setLoginData] = useState({
    primary_email: "",
    password: "",
  });
  const [passwordHidden, setPasswordHidden] = useState(true);

  const { loading, login } = useUser();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(loginData, (response, error) => {
      if (error) {
        errorToast("Invalid credentials or user not found. Please try again.");
        return;
      }

      dispatch(setUser(response?.data));
      navigate("/user/play_game");
    });
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.login_container}>
        <div className={styles.login_sub_container}>
          <div className={styles.login_header}>
            <h1>Login</h1>
          </div>
          <div className={styles.login_fields}>
            <div className={styles.login_field}>
              <label>Enter your email</label>
              <input
                type="email"
                placeholder="Enter your Email..."
                value={loginData.primary_email}
                name="email"
                onChange={(event) => {
                  setLoginData({
                    ...loginData,
                    primary_email: event.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.login_field}>
              <label>Enter your password</label>
              <div className={styles.password}>
                <input
                  type={passwordHidden ? "password" : "text"}
                  placeholder="Enter your password..."
                  value={loginData.password}
                  name="password"
                  onChange={(event) => {
                    setLoginData({
                      ...loginData,
                      password: event.target.value,
                    });
                  }}
                />
                {passwordHidden ? (
                  <Eye
                    onClick={() => {
                      setPasswordHidden(!passwordHidden);
                    }}
                    className={styles.icon}
                    size="16"
                  />
                ) : (
                  <EyeSlash
                    onClick={() => {
                      setPasswordHidden(!passwordHidden);
                    }}
                    className={styles.icon}
                    size="16"
                  />
                )}
              </div>
            </div>
          </div>
          <CustomButton onClick={handleLogin} className={styles.login_submit}>
            {loading ? `Logging in...` : `Login`}
          </CustomButton>
          <span>
            Don't have account? <Link to="/auth/register">Register here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
