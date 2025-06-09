import styles from "../../app/styles/Authorization.module.css";
import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { createUser } from "../../entities/signUp";
import { useTranslation } from "react-i18next";

type typeMessage = "off" | "error" | "success";
interface ICreateMessage{
  typeMessage:typeMessage,
  message:string,
}

const SignUp = ({ switchToLogin }: { switchToLogin: () => void }) => {
  const [login, setLogin] = useState("UserMail");
  const [email,setEmail] = useState("v883740@gmail.com");
  const [password, setPassword] = useState("ghost1313");
  const [confirmPassword, setConfirmPassword] = useState("ghost1313");
  const [isMesssage, setIsMessage] = useState<typeMessage>("off");
  const [textMessage, setTextMessage] = useState("");
   const {t} = useTranslation()

  function handlerLogin(e: ChangeEvent<HTMLInputElement>) {
    setLogin(e.target.value);
  }


   function handlerEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
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




  function errorChangeLang(message:string):string{
    switch(message){
        case "Пароль должен быть не короче 8 символов.":
        return `${t("errorShortPass")}`
        case "A user with that username already exists.":
        return `${t("errorUserExists")}`
        case "Пароль не должен состоять только из цифр.":
        return `${t("errorPassOnlyDigits")}`
        case "Пользователь с такой почтой уже существует.":
             return `${t("errorEmailExists")}`
        case "Пароль не должен состоять только из букв.":
        return `${t("errorPassOnlyLetters")}`

        case "Пароли не совпадают.":
        return `${t("errorPasswordsMismatch")}`

        default:
         return message;
    }

  }

async function handlerSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  try {
    if (!login || !email|| !password || !confirmPassword) {
      createMessage({ typeMessage: "error", message: `${t("errorFillAllInputs")}`});
      return;
    }

    await createUser({login,email,password,confirmPassword,setIsMessage,setTextMessage});

    createMessage({ typeMessage: "success", message: `${t("registerSuccess")}` });

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
            createMessage({ typeMessage: "error", message: errorChangeLang(msg) });
          });
          console.log(messages[0])
        } else {
          createMessage({ typeMessage: "error", message: messages });
        }
      }
    } else {
      createMessage({ typeMessage: "error", message: `${t("errorByServer")}` });
    }
  }
}


  return (
    <form onSubmit={handlerSubmit} className={styles.formWrap}>
      <h3 className={styles.titleForm}> {t("signUp")}</h3>
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
        placeholder={t("login")}
      />
        <input
        className={styles.inputForm}
        onChange={handlerEmail}
        value={email}
        id="email"
        type="email"
        placeholder={t("email")}
      />
      <input
        className={styles.inputForm}
        onChange={handlerPassword}
        value={password}
        id="password"
        type="password"
        placeholder={t("password")}
      />
      <input
        className={styles.inputForm}
        onChange={handlerConfirmPassword}
        value={confirmPassword}
        id="password"
        type="password"
        placeholder={t("confirmPass")}
      />
      <button className={styles.submitForm} type="submit">
        {t("signUp")}
      </button>
    </form>
  );
};

export default SignUp;
