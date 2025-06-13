import styles from "../../app/styles/ModalForgotPassword.module.css";
import {useSelector,useDispatch} from "react-redux";
import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { RootState } from "../../store";
import { sendLetter } from "../../entities/forgotPassword";
const ModalForgotPassword = () => {
    const [email,setEmail] = useState("")
    const {t} = useTranslation()
    const {users}  = useSelector((state:RootState)=>state.usersSlice)
    const dispatch = useDispatch()
    function handlerEmail(e: ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value)
    }
    async function sendForgotPassword(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        await sendLetter({users,email,dispatch,t})
    }

  return (
    <div className={styles.modalWrap}>
      <div className={styles.wrapContent}>
        <span >{`${t("titleModalForgotPassword")}`}</span>
        <form onSubmit={(e)=>sendForgotPassword(e)}>
            <input
                type="email"
                value={email}
                placeholder={`${t("email")}`}
                onChange={(e)=>handlerEmail(e)}
             />
             <button type="submit">{`${t("send")}`}</button>
        </form>

      </div>
    </div>
  );
};

export default ModalForgotPassword;
