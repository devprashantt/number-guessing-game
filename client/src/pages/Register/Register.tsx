import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUser } from "../../apis";

import { errorToast } from "../../lib/toast";

import { CustomButton } from "../../components";

import { Eye, EyeSlash } from "../../icons";

// @ts-ignore
import styles from "./Register.module.scss";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    primary_email: "",
    first_name: "",
    last_name: "",
    password: "",
    full_name: "",
    role: "user",
  });
  const [passwordHidden, setPasswordHidden] = useState(true);

  const { register, loading } = useUser();

  const navigate = useNavigate();

  const handleRegister = async () => {
    register({ ...registerData }, (response: any, error: any) => {
      if (error) {
        errorToast("Error in register. Please try again.");
        return;
      }
      console.log(`[APP_USER]`, response);
      navigate("/auth/login");
    });
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.signup_container}>
        <div className={styles.signup_sub_container}>
          <div className={styles.signup_header}>
            <h1>Signup</h1>
          </div>
          <div className={styles.signup_fields}>
            <div className={styles.signup_field}>
              <label>Enter your name</label>
              <input
                value={registerData?.full_name}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    full_name: e.target.value,
                    first_name: e.target.value.split(" ")[0],
                    last_name: e.target.value.split(" ")[1] || "",
                  })
                }
                type="text"
                placeholder="Enter your Name..."
              />
            </div>
            <div className={styles.signup_field}>
              <label>Enter your email</label>
              <input
                value={registerData.primary_email}
                onChange={(e) => {
                  setRegisterData({
                    ...registerData,
                    primary_email: e.target.value,
                  });
                }}
                type="email"
                placeholder="Enter your Email..."
              />
            </div>
            <div className={styles.signup_field}>
              <label>Enter your password</label>
              <div className={styles.password}>
                <input
                  value={registerData.password}
                  onChange={(e) => {
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    });
                  }}
                  type={passwordHidden ? "password" : "text"}
                  placeholder="Enter your password..."
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
          <CustomButton
            onClick={handleRegister}
            className={styles.signup_submit}
          >
            {loading ? `Signing up...` : `Sign up`}
          </CustomButton>
          <span>
            Already have account? <Link to="/auth/login"> Login here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
