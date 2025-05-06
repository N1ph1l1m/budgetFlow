import { useEffect, useState } from "react";
import styles from "../../App/Styles/Nav.module.css"
import { InputTransaction } from "../../Shared/InputTransaction/InputTransaction";
import { NavLink } from "react-router"


type NavProps = {
    isButton: boolean;
  };

export const Nav =  ({ isButton }: NavProps) =>{
    const [count,setCoutn] = useState(false);

    useEffect(()=>{console.log(count);},[count])

    function handlerModal(){
        setCoutn(prev => !prev  )
    }
    return(<>
        <div className={styles.wrapMain}>
        <ul className={styles.navItemWrap}>
            <NavLink to="/"> <li className={styles.navItem}>Главная</li> </NavLink>
            <NavLink to="analitics/"> <li className={styles.navItem}>Обзор</li> </NavLink>
            <NavLink to="setting/"><li className={styles.navItem}>Настройки</li></NavLink>
        </ul>
        <span>{count}</span>
        <div style={{display: isButton ? "flex" : "none" }} className={styles.addTransactionWrap}>
          <button className={styles.addTransactionButton} onClick={()=>handlerModal()}>+</button>
        </div>
        </div>

        {count && <div className={styles.modal}>
            <button onClick={()=>handlerModal()}>X</button>
           <InputTransaction title="Доходы" typeItem="income" />
            </div>}
        </>)
}
