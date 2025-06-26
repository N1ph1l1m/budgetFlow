import styles from "../../app/styles/Authorization.module.css";
import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { createUser } from "../../entities/signUp";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../shared/Notification/Notification";
import {
  createError,
  resetNotification,
} from "../../store/Slice/notificationSlice/notificationSlice";
import { RootState } from "../../store";
import Modal from "../../shared/ModalWindow/ModalTransaction";
import { closeModalSignUp } from "../../store/Slice/modalTransaction/modalTransactionSlice";
const SignUp = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { t } = useTranslation();
  const {users} = useSelector((state:RootState)=>state.usersSlice)
  const {modalSignUp} = useSelector((state:RootState)=>state.modalTransactionSlice)
  const {textMessage} = useSelector((state:RootState)=>state.notificationSlice)
  const dispatch = useDispatch();


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



  async function handlerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!login || !email || !password || !confirmPassword) {
        dispatch(createError(`${t("errorFillAllInputs")}`));
        return;
      }

     await createUser({
        login,
        email,
        password,
        confirmPassword,
        users,
        dispatch,
        t,
      });

    }catch(error:unknown){
          dispatch(createError(`${error}`));
    }
  }

  function closeModal(){
    dispatch(closeModalSignUp())
    dispatch(resetNotification())
    setLogin("");
    setPassword("");
    setEmail("")
    setConfirmPassword("");
  }

  return (
    <>
    {modalSignUp && <Modal title={`${t("signUp")}`}  closeModal={()=>closeModal()}/>}
      <form onSubmit={handlerSubmit} className={styles.formWrap}>
      <h3 className={styles.titleForm}> {t("signUp")}</h3>
   {textMessage !== t("registerSuccess") && <Notification />}
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
    </form></>
  );
};

export default SignUp;
