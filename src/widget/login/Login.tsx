import styles from "../../app/styles/Authorization.module.css";
import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {loginUser} from "../../entities/logIn";
import createMessage from "../../entities/createMessage";
import { typeMessage } from "../../entities/createMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isMesssage, setIsMessage] = useState<typeMessage>("off");
  const [textMessage, setTextMessage] = useState("");
  const { t } = useTranslation();
  const {users} = useSelector((state:RootState)=>state.usersSlice)

  const navigate = useNavigate();

  function handlerLogin(e: ChangeEvent<HTMLInputElement>) {
    setLogin(e.target.value);
  }

  function handlerPassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function validateForm(): string | null {
    if (!login && !password) return `${t("errorInputLog/Pass")}`;
    if (!login) return `${t("errorInputLogin")}`;
    if (!password) return `${t("errorInputPassword")}`;
    return null;
  }


  function handlerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      createMessage({
        typeMessage: "error",
        message: errorMessage,
        setIsMessage,
        setTextMessage,
      });
      return;
    }
    loginUser({
      login: login,
      password: password,
      users:users,
      t:t,
      setIsMessage: setIsMessage,
      setTextMessage: setTextMessage,
      navigate: navigate,
    });
  }

  return (
    <form onSubmit={handlerSubmit} className={styles.formWrap}>
      <h3 className={styles.titleForm}>{t("logIn")} </h3>
      {isMesssage !== "off" && (
        <span
          className={`${
            isMesssage == "success"
              ? styles.messageSuccess
              : styles.messageError
          }`}
        >
          {textMessage}
        </span>
      )}
      <input
        className={styles.inputForm}
        onChange={handlerLogin}
        value={login}
        id="login"
        type="text"
        placeholder={`${t("login")}`}
      />
      <input
        className={styles.inputForm}
        onChange={handlerPassword}
        value={password}
        id="password"
        type="password"
        placeholder={`${t("password")}`}
      />
      <button className={styles.submitForm} type="submit">
        {t("logIn")}
      </button>
    </form>
  );
};

export default Login;
