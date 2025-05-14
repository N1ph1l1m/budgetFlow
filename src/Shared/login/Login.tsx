import styles from "../../app/styles/Authorization.module.css";
import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
type typeMessage = "off" | "error" | "success";
interface ICreateMessage{
  typeMessage:typeMessage,
  message:string,
}
const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isMesssage, setIsMessage] = useState<typeMessage>("off");
  const [textMessage, setTextMessage] = useState("");

  const navigate = useNavigate()

  const rightLogin = "admin"
  const rightPassword = "ghost"
  function handlerLogin(e: ChangeEvent<HTMLInputElement>) {
    setLogin(e.target.value);
  }

  function handlerPassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
 function createMessage({typeMessage,message}:ICreateMessage ){
        setIsMessage(typeMessage);
        setTextMessage(message);
  }

  function handlerSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      console.log(login, password);
      e.preventDefault();
      if (login.length == 0 && password.length == 0) {
        createMessage({typeMessage:"error",message:"Введитее логин и пароль  пароль"})
      } else if (login.length == 0) {
        createMessage({typeMessage:"error",message:"Введите логин "})
      } else if (password.length == 0) {
         createMessage({typeMessage:"error",message:"Введитее пароль"})
      }else if(login !== rightLogin && password == rightPassword){
        createMessage({typeMessage:"error",message:"Неверный логин или  пароль"})
      }else{
        createMessage({typeMessage:"success",message:"Авторизация успешна"})
        localStorage.setItem("token",login)
        setTimeout(()=>{
          setLogin("")
          setPassword("")
          createMessage({typeMessage:"off",message:""})
          navigate("/", { replace: true });
          setTextMessage("")},3000)
       }
      }
     catch (error) {
      createMessage({typeMessage:"error",message:`${error}`})
    }

  }

  return (
    <form onSubmit={handlerSubmit} className={styles.formWrap}>
      <h3 className={styles.titleForm}>Log in </h3>
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
      <button className={styles.submitForm} type="submit">
        Let's go
      </button>
    </form>
  );
};

export default Login;
