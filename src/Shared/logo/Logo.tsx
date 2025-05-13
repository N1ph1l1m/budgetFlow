import styles from "../../app/styles/Logo.module.css"
import logo  from "../../app/icons/logo-512.png"
import { NavLink } from "react-router";
const Logo = () => {
    return (<>
     <NavLink to="/">
      <div className={styles.logoWrap}>
            <img className={styles.logoIcon} alt="logoMain" src={logo} />
            <h1 className={styles.logoTitle}>Budget Flow</h1>
        </div>
    </NavLink>

    </>

    );
};

export default Logo;
