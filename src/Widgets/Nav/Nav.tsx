import styles from "../../App/Styles/Nav.module.css"
import { NavLink } from "react-router"
export const Nav = ()=>{
    return(<>
        <div className={styles.wrapMain}>
        <ul className={styles.navItemWrap}>
            <NavLink to="/"> <li className={styles.navItem}>Главная</li> </NavLink>
            <NavLink to="income/"><li className={styles.navItem}>Доходы</li></NavLink>
            <NavLink to="/"><li className={styles.navItem}>Расходы</li></NavLink>
            <NavLink to="analitics/"> <li className={styles.navItem}>Статистика</li> </NavLink>
            <NavLink to="/"><li className={styles.navItem}>Настройки</li></NavLink>
        </ul>
        </div>
        </>)
}
