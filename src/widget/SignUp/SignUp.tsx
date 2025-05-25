import styles from "../../app/styles/Authorization.module.css";
import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import {param} from "../../app/params/param"
import axios from "axios";
type typeMessage = "off" | "error" | "success";
interface ICreateMessage{
  typeMessage:typeMessage,
  message:string,
}

const SignUp = ({ switchToLogin }: { switchToLogin: () => void }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMesssage, setIsMessage] = useState<typeMessage>("off");
  const [textMessage, setTextMessage] = useState("");

  function handlerLogin(e: ChangeEvent<HTMLInputElement>) {
    setLogin(e.target.value);
  }

 async function createUser() {
  const url = `${param.baseUser}register/`;
  try {
    const response = await axios.post(url, {
      username: login,
      password: password,
      confirm_password:confirmPassword
    });

    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Ошибка при создании пользователя:", error);
    throw error;
  }
}


  function handlerPassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function handlerConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }
  function createMessage({typeMessage,message}:ICreateMessage ){
        setIsMessage(typeMessage);
        setTextMessage(message);
  }


async function handlerSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  try {
    if (!login || !password || !confirmPassword) {
      createMessage({ typeMessage: "error", message: "Заполните все поля." });
      return;
    }

    await createUser();

    createMessage({ typeMessage: "success", message: "Регистрация успешно выполнена" });

    setTimeout(() => {
      setIsMessage("off");
      setTextMessage("");
      setLogin("");
      setPassword("");
      setConfirmPassword("");
      switchToLogin();
    }, 2000);

  } catch (error: any) {
    if (error.response && error.response.data) {
      const errors = error.response.data;
      for (const key in errors) {
        const messages = errors[key];
        if (Array.isArray(messages)) {
          messages.forEach((msg) => {
            createMessage({ typeMessage: "error", message: msg });
          });
        } else {
          createMessage({ typeMessage: "error", message: messages });
        }
      }
    } else {
      createMessage({ typeMessage: "error", message: "Произошла ошибка на сервере." });
    }
  }
}


  return (
    <form onSubmit={handlerSubmit} className={styles.formWrap}>
      <h3 className={styles.titleForm}>Sign Up</h3>
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
        placeholder="Login"
      />
      <input
        className={styles.inputForm}
        onChange={handlerPassword}
        value={password}
        id="password"
        type="password"
        placeholder="Password"
      />
      <input
        className={styles.inputForm}
        onChange={handlerConfirmPassword}
        value={confirmPassword}
        id="password"
        type="password"
        placeholder="Confirm password"
      />
      <button className={styles.submitForm} type="submit">
        Confirm
      </button>
    </form>
  );
};

export default SignUp;
