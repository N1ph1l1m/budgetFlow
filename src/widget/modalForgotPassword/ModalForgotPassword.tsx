import styles from "../../app/styles/ModalForgotPassword.module.css";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { closeModalForgotPassword } from "../../store/Slice/modalTransaction/modalTransactionSlice";
import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { RootState } from "../../store";
import { checkUserEmail } from "../../entities/logIn";
import { forgotPassword } from "../../entities/forgotPassword";
const ModalForgotPassword = () => {
    const [email,setEmail] = useState("")
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const {users}  = useSelector((state:RootState)=>state.usersSlice)

    function handlerEmail(e: ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value)
    }
    async function sendForgotPassword(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
      const isEmail =   checkUserEmail({users,email})
      if(isEmail){
       await  forgotPassword(email)
      }

    }
  return (
    <div className={styles.modalWrap}>
      <header className={styles.headeWrap}>
        <h1 className={styles.titleHeader}>{`${t("forgotPassword")}`}</h1>
        <button
          className={styles.closeModal}
          onClick={() => dispatch(closeModalForgotPassword())}
        >
          <IoMdClose color="black" size="20" />
        </button>
      </header>
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
