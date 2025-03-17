import styles from "../../App/Styles/Nav.module.css"
export const Nav = ()=>{
    return(<>
        <div className={styles.wrapMain}>
        <ul className={styles.navItemWrap}>
            <li className={styles.navItem}>Главная</li>
            <li className={styles.navItem}>Статистика</li>
            <li className={styles.navItem}>Бюджет</li>
            <li className={styles.navItem}>Категории расходов</li>
            <li className={styles.navItem}>Финансовые цели </li>
            <li className={styles.navItem}>Настройки</li>
        </ul>
        </div>
        </>)
}
