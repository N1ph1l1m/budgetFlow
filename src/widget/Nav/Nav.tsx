import styles from "../../App/Styles/Nav.module.css";
import { InputTransaction } from "../../shared/InputTransaction/InputTransaction";
import { NavLink } from "react-router";
import Modal from "../ModalWindow/ModalTransaction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { isModalInput } from "../../store/Slice/modalTransaction/modalTransactionSlice";
import Logo from "../../shared/logo/Logo";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { getListCategory } from "../../entities/API/getListCategory";

type NavProps = {
  isButton: boolean;
  location: string;
};

export const Nav = ({ isButton, location }: NavProps) => {
  const dispatch = useDispatch();
  const [isDropDown, setIsDropDown] = useState(false);
  const { modalInput } = useSelector(
    (state: RootState) => state.modalTransactionSlice
  );
  const { categoryList } = useSelector(
    (state: RootState) => state.transactionsSlice
  );
  const DropDownList = () => {
    return (
      <>
        {isDropDown && (
          <ul className={styles.dropDownListWrap}>
            <NavLink to="month/">
              {" "}
              <li>Месяц </li>
            </NavLink>
            <NavLink to="allTime">
              <li>Все время </li>
            </NavLink>
            <NavLink to="custom/">
              <li>Период</li>
            </NavLink>
          </ul>
        )}
      </>
    );
  };
  function toggleDropDown() {
    setIsDropDown((prev) => !prev);
  }

  async function handlerIsModal() {
    getListCategory({categoryList, dispatch});
    dispatch(isModalInput());
  }

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
          </NavLink>{" "}
          <li
            className={`${styles.navItem}   ${
              location === "/review/" ? styles.navItemActive : ""
            }`}
            onClick={() => toggleDropDown()}
          >
            Обзор{" "}
            <span>
              <IoIosArrowDown size={12} />
            </span>
            {<DropDownList />}
          </li>{" "}
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
          onClick={() => handlerIsModal()}
        >
          +
        </button>
      </div>
    </>
  );
};
