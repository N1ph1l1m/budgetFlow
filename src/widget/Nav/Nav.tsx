
import styles from "../../App/Styles/Nav.module.css"
import { InputTransaction } from "../../shared/InputTransaction/InputTransaction";
import { NavLink } from "react-router"
import Modal from "../ModalWindow/ModalTransaction";
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../../store";
import { isModalInput } from "../../store/Slice/modalTransaction/modalTransactionSlice";
type NavProps = {
    isButton: boolean;
  };

export const Nav =  ({ isButton }: NavProps) =>{
    const dispatch = useDispatch();
    const {modalInput}  = useSelector((state:RootState)=>state.modalTransactionSlice)


    return(<>

        {modalInput &&
          <Modal>
          <InputTransaction/>
          </Modal>
          }
        <div className={styles.wrapMain}>
        <ul className={styles.navItemWrap}>
            <NavLink to="/"> <li className={styles.navItem}>Главная</li> </NavLink>
            <NavLink to="analitics/"> <li className={styles.navItem}>Обзор</li> </NavLink>
            <NavLink to="setting/"><li className={styles.navItem}>Настройки</li></NavLink>
        </ul>
        <p>{modalInput}</p>

        <div style={{display: isButton ? "flex" : "none" }} className={styles.addTransactionWrap}>
          <button className={styles.addTransactionButton} onClick={()=>dispatch(isModalInput())}>+</button>

        </div>
        </div>

        </>)
}
