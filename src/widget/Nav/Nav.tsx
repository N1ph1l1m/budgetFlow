import styles from "../../App/Styles/Nav.module.css";
import { InputTransaction } from "../../shared/InputTransaction/InputTransaction";
import { NavLink } from "react-router";
import Modal from "../../shared/ModalWindow/ModalTransaction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { isModalInput, resetUpdate } from "../../store/Slice/modalTransaction/modalTransactionSlice";
import Logo from "../../shared/logo/Logo";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { getListCategory } from "../../entities/crud/getListCategory";
import { BurgerMenu } from "../../shared/BurgerMenu/BurgerMenu";
import { useTranslation } from "react-i18next";
import { closeModalInput } from "../../store/Slice/modalTransaction/modalTransactionSlice";
type NavProps = {
  isButton: boolean;
  location: string;
};

export const Nav = ({ isButton, location }: NavProps) => {
  const dispatch = useDispatch();
  const [isDropDown, setIsDropDown] = useState(false);
  const [isBurger, setIsBurger] = useState(false);
  const { modalInput } = useSelector(
    (state: RootState) => state.modalTransactionSlice
  );
  const { categoryList } = useSelector(
    (state: RootState) => state.transactionsSlice
  );
  const { t } = useTranslation();

  function closeModal():void{
    dispatch(closeModalInput());
    dispatch(resetUpdate())
  }

const DropDownList = () => {
    return (
      <>
        {isDropDown && (
          <ul className={styles.dropDownListWrap}>
            <NavLink to="month/">
              {" "}
              <li onClick={() => isBurger && handlerBurgerMenu()}>
                {t("month")}{" "}
              </li>
            </NavLink>
            <NavLink to="allTime">
              <li onClick={() => isBurger && handlerBurgerMenu()}>
                {t("allTime")}
              </li>
            </NavLink>
            <NavLink to="custom/">
              <li onClick={() => isBurger && handlerBurgerMenu()}>
                {t("period")}
              </li>
            </NavLink>
            <NavLink to="search/">
              <li onClick={() => isBurger && handlerBurgerMenu()}>
                {t("search")}
              </li>
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
    getListCategory({ categoryList, dispatch });
    dispatch(isModalInput());
  }
  function handlerBurgerMenu() {
    setIsBurger((prev) => !prev);
  }

const ListNav = () => {
    return (
      <>
        <NavLink to="/">
          {" "}
          <li
            onClick={() => isBurger && handlerBurgerMenu()}
            className={`${styles.navItem} ${
              location === "/" ? styles.navItemActive : ""
            }`}
          >
            {t("main")}
          </li>{" "}
        </NavLink>{" "}
        <li
          className={`${styles.navItem}   ${
            location === "/review/" ? styles.navItemActive : ""
          }`}
          onClick={() => toggleDropDown()}
        >
          {t("review")}
          <span>
            <IoIosArrowDown size={12} />
          </span>
          {<DropDownList />}
        </li>{" "}
        <NavLink to="setting/">
          <li
            onClick={() => isBurger && handlerBurgerMenu()}
            className={`${styles.navItem} ${
              location === "/setting/" ? styles.navItemActive : ""
            }`}
          >
            {t("setting")}
          </li>
        </NavLink>
      </>
    );
  };

  return (
    <>
      {modalInput && (
        <Modal title={`${t("newTransaction")}`}
                children={<InputTransaction />}
                closeModal={()=>closeModal()}/>
      )}
      <div className={styles.wrapMain}>
        <Logo />
        <BurgerMenu
          onChange={() => handlerBurgerMenu()}
          className={styles.burgerWrap}
          checked={isBurger}
        />
        {isBurger && (
          <div className={styles.menuBurger}>
            <ul className={styles.navItemMenuWrap}>
              <ListNav />
            </ul>
          </div>
        )}
        <ul className={styles.navItemWrap}>
          <ListNav />
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
