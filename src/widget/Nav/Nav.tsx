import styles from "../../App/Styles/Nav.module.css";
import { InputTransaction } from "../../shared/InputTransaction/InputTransaction";
import { NavLink } from "react-router";
import Modal from "../ModalWindow/ModalTransaction";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { isModalInput } from "../../store/Slice/modalTransaction/modalTransactionSlice";
import Logo from "../../shared/logo/Logo";
type NavProps = {
  isButton: boolean;
  location: string;
};

export const Nav = ({ isButton, location }: NavProps) => {
  const dispatch = useDispatch();
  const { modalInput } = useSelector(
    (state: RootState) => state.modalTransactionSlice
  );

  return (
    <>
      {modalInput && (
        <Modal>
          <InputTransaction />
        </Modal>
      )}
      <div className={styles.wrapMain}>
        <Logo />
        <ul className={styles.navItemWrap}>
          <NavLink to="/">
            {" "}
            <li
              className={`${styles.navItem} ${
                location === "/" ? styles.navItemActive : ""
              }`}
            >
              Главная
            </li>{" "}
          </NavLink>
          <NavLink to="review/">
            {" "}
            <li
              className={`${styles.navItem} ${
                location === "/review/" ? styles.navItemActive : ""
              }`}
            >
              Обзор
            </li>{" "}
          </NavLink>
          <NavLink to="setting/">
            <li
              className={`${styles.navItem} ${
                location === "/setting/" ? styles.navItemActive : ""
              }`}
            >
              Настройки
            </li>
          </NavLink>
        </ul>
      </div>
      <div
        style={{ display: isButton ? "flex" : "none" }}
        className={styles.addTransactionWrap}
      >
        <button
          className={styles.addTransactionButton}
          onClick={() => dispatch(isModalInput())}
        >
          +
        </button>
      </div>
    </>
  );
};
