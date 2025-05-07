import { useEffect, useState } from "react";
import styles from "../../App/Styles/Nav.module.css"
import { InputTransaction } from "../../shared/InputTransaction/InputTransaction";
import { NavLink } from "react-router"
import Modal from "../ModalWindow/ModalTransaction";

type NavProps = {
    isButton: boolean;
  };

export const Nav =  ({ isButton }: NavProps) =>{
    const [isModal,setCoutn] = useState(false);

    // useEffect(()=>{console.log(count);},[count])

    function handlerModal(){
        setCoutn(prev => !prev  )
    }
    return(<>
        {isModal &&  <Modal>
          <InputTransaction isModal={isModal} close={()=>handlerModal()} />
          </Modal>
          }
        <div className={styles.wrapMain}>
        <ul className={styles.navItemWrap}>
            <NavLink to="/"> <li className={styles.navItem}>Главная</li> </NavLink>
            <NavLink to="analitics/"> <li className={styles.navItem}>Обзор</li> </NavLink>
            <NavLink to="setting/"><li className={styles.navItem}>Настройки</li></NavLink>
        </ul>

        <div style={{display: isButton ? "flex" : "none" }} className={styles.addTransactionWrap}>
          <button className={styles.addTransactionButton} onClick={()=>handlerModal()}>+</button>
        </div>
        </div>

        </>)
}
