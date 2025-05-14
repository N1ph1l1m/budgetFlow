import styles from "../../app/styles/Logo.module.css";
import logo from "../../app/icons/logo-512.png";
import { NavLink } from "react-router-dom"; // убедитесь, что используете 'react-router-dom'

interface ILogo {
  large?: boolean;
  disableLink?: boolean;
}

const Logo = ({ large, disableLink }: ILogo) => {
  const content = (
    <div className={styles.logoWrap}>
      <img
        className={`${styles.logoIcon} ${large ? styles.large : ""}`}
        alt="logoMain"
        src={logo}
      />
      <h1 className={styles.logoTitle}>Budget Flow</h1>
    </div>
  );

  return disableLink ? (
    <div style={{ cursor: "default" }}>{content}</div>
  ) : (
    <NavLink to="/">{content}</NavLink>
  );
};

export default Logo;
