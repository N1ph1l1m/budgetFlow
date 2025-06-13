import styles from "../../app/styles/Authorization.module.css";
import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { loginUser } from "../../entities/logIn";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import Modal from "../../shared/ModalWindow/ModalTransaction";
import {
  closeModalForgotPassword,
  setIsModalForgotPassword,
} from "../../store/Slice/modalTransaction/modalTransactionSlice";
import ModalForgotPassword from "../modalForgotPassword/ModalForgotPassword";
import { resetNotification } from "../../store/Slice/notificationSlice/notificationSlice";
import Notification from "../../shared/Notification/Notification";
import { createSuccess } from "../../store/Slice/notificationSlice/notificationSlice";
const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const { users } = useSelector((state: RootState) => state.usersSlice);
  const { modalForgotPassword } = useSelector(
    (state: RootState) => state.modalTransactionSlice
  );

  const dispatch = useDispatch();
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
      dispatch(createSuccess(`${validateForm()}`));
      return;
    }
    loginUser({
      login: login,
      password: password,
      users: users,
      t: t,
      navigate,
      dispatch,
    });
  }
  function closeModal() {
    dispatch(closeModalForgotPassword());
    dispatch(resetNotification());
  }

  return (
    <>
      {modalForgotPassword && (
        <Modal
          title={`${t("forgotPassword")}`}
          children={<ModalForgotPassword />}
          closeModal={() => closeModal()}
        />
      )}
      <form onSubmit={handlerSubmit} className={styles.formWrap}>
        <h3 className={styles.titleForm}>{t("logIn")} </h3>
        <Notification />
        <input
          className={styles.inputForm}
          onChange={handlerLogin}
          value={login}
          id="login"
          type="text"
          placeholder={`${t("login")}`}
        />
        <div className={styles.inputPassWrap}>
          <label className={styles.labelPass} htmlFor="password">
            <button
              type="button"
              className={styles.forgotPasswordButton}
              onClick={() => dispatch(setIsModalForgotPassword())}
            >{`${t("forgotPassword")}`}</button>
          </label>
          <input
            className={`${styles.inputForm} ${styles.inputPassword}`}
            onChange={handlerPassword}
            value={password}
            id="password"
            type="password"
            placeholder={`${t("password")}`}
          />
        </div>

        <button className={styles.submitForm} type="submit">
          {t("logIn")}
        </button>
      </form>
    </>
  );
};

export default Login;
