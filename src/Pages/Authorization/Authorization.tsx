import styles from "../../app/styles/Authorization.module.css";
import Logo from "../../shared/logo/Logo";
import Login from "../../shared/login/Login";
import SignUp from "../../shared/SignUp/SignUp";
import { useState } from "react";

const Authorization = () => {
  const [isLogIn, setIsLogIn] = useState(true);
  function switchLogIn() {
    setIsLogIn((prev) => !prev);
  }
  return (
    <div className={styles.mainWrap}>
      <div className={styles.wrapContent}>
        <Logo large disableLink />
        {isLogIn ? <Login /> : <SignUp />}
        {isLogIn ? (
          <span>
            No account?{" "}
            <button
              onClick={() => switchLogIn()}
              className={styles.switchTypeForm}
            >
              Sign up
            </button>
          </span>
        ) : (
          <span>
            {" "}
            Have an account?{" "}
            <button
              onClick={() => switchLogIn()}
              className={styles.switchTypeForm}
            >
              Log in{" "}
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default Authorization;
