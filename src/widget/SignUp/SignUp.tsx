import styles from "../../app/styles/Authorization.module.css";
import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";

type typeMessage = "off" | "error" | "success";
interface ICreateMessage{
  typeMessage:typeMessage,
  message:string,
}

const SignUp = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMesssage, setIsMessage] = useState<typeMessage>("off");
  const [textMessage, setTextMessage] = useState("");

  function handlerLogin(e: ChangeEvent<HTMLInputElement>) {
    setLogin(e.target.value);
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
  function handlerSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (login.length == 0) {
        createMessage({typeMessage:"error",message:"Введите логин "})
      } else if (password.length == 0) {
           createMessage({typeMessage:"error",message:"Введитее пароль"})
      } else if (confirmPassword.length == 0) {
        createMessage({typeMessage:"error",message:"Подтвердите пароль"})
      } else if (password !== confirmPassword) {
        createMessage({typeMessage:"error",message:"Пароли не совпадают"})
      } else if (password == confirmPassword && login.length > 0) {
        createMessage({typeMessage:"success",message:"Регистрация успешна выполнена"})
        setTimeout(() => {
        setIsMessage("off");
        setTextMessage("");
        setLogin("")
        setPassword("")
        setConfirmPassword("")
      }, 3000);
      }
    } catch (error) {
      createMessage({typeMessage:"error",message:`${error}`})
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
