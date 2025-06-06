import styles from "../../app/styles/Authorization.module.css";
import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import { param } from "../../app/params/param";
import axios from "axios";
import { useTranslation } from "react-i18next";
type typeMessage = "off" | "error" | "success";
interface ICreateMessage {
  typeMessage: typeMessage;
  message: string;
}
const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isMesssage, setIsMessage] = useState<typeMessage>("off");
  const [textMessage, setTextMessage] = useState("");
  const {t,i18n} = useTranslation()

  const navigate = useNavigate();

  function handlerLogin(e: ChangeEvent<HTMLInputElement>) {
    setLogin(e.target.value);
  }

  function handlerPassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function createMessage({ typeMessage, message }: ICreateMessage) {
    setIsMessage(typeMessage);
    setTextMessage(message);
  }

  async function getMe(token:string) {
    try{
    const URL = `${param.baseUser}auth/users/me/`;
      const {data} = await axios.get(URL, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      localStorage.setItem("token",token)
      localStorage.setItem("username", data.username);
      localStorage.setItem("id", data.id);
    }catch(error){
      createMessage({ typeMessage: "error", message: `${error}` });
    }
  }
  async function loginUser() {
    try {
      const URL = `${param.baseUser}auth/token/login/`;
      const { data } = await axios.post(URL, {
        username: login,
        password: password,
      });
      await  getMe(data.auth_token)
      navigate("/", { replace: true });
    } catch (error) {
      createMessage({ typeMessage: "error", message: `${error}` });
    }
  }
  function validateForm(): string | null {
    if (!login && !password) return `${t("errorInputLog/Pass")}`
    if (!login) return `${t("errorInputLogin")}`;
    if (!password) return `${t("errorInputPassword")}`;
    return null;
  }

  function handlerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      createMessage({ typeMessage: "error", message: errorMessage });
      return;
    }
    loginUser();
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
