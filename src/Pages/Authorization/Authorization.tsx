import { useTranslation } from "react-i18next";
import styles from "../../app/styles/Authorization.module.css";
import Logo from "../../shared/logo/Logo";
import Login from "../../widget/login/Login";
import SignUp from "../../widget/SignUp/SignUp";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import getUserList from "../../entities/getUserList";
const Authorization = () => {
  const dispatch = useDispatch()
  const [isLogIn, setIsLogIn] = useState(true);


  async function getUsers() {
      await getUserList(dispatch)
  }

  useEffect(()=>{
    getUsers()
  },[])


  function switchLogIn() {
    setIsLogIn((prev) => !prev);
  }
  function resetIsLogin(){
    setIsLogIn(true)
  }
    const {t,i18n} = useTranslation()
   const changeLanguage = (e:React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    <div className={styles.mainWrap}>
      <div className={styles.wrapContent}>
          <div className={styles.wrapButtonLang}>
            <select  onChange={(e)=>changeLanguage(e)}>
          <option value={"ru"}>RU</option>
          <option value={"en"}>EN</option>
        </select>
        </div>


        <Logo large disableLink />

        {isLogIn ? <Login /> : <SignUp  switchToLogin = {resetIsLogin}/>}
        {isLogIn ? (
          <span>
            {t("noAccount")}
            <button
              onClick={() => switchLogIn()}
              className={styles.switchTypeForm}
            >
             {t("signUp")}
            </button>
          </span>
        ) : (
          <span>
            {t("haveAnAccount")}

            <button
              onClick={() => switchLogIn()}
              className={styles.switchTypeForm}
            >
              {t("logIn")}
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default Authorization;
