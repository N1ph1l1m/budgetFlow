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
import { BurgerMenu } from "../../shared/BurgerMenu/BurgerMenu";
type NavProps = {
  isButton: boolean;
  location: string;
};

export const Nav = ({ isButton, location }: NavProps) => {
  const dispatch = useDispatch();
  const [isDropDown, setIsDropDown] = useState(false);
  const [isBurger,setIsBurger] = useState(false)
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
              <li   onClick={()=>isBurger &&  handlerBurgerMenu() }>Месяц </li>
            </NavLink>
            <NavLink to="allTime">
              <li   onClick={()=>isBurger &&  handlerBurgerMenu() } >Все время </li>
            </NavLink>
            <NavLink to="custom/">
              <li   onClick={()=>isBurger &&  handlerBurgerMenu() } >Период</li>
            </NavLink>
             <NavLink to="search/">
              <li   onClick={()=>isBurger &&  handlerBurgerMenu() } >Поиск</li>
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
  function handlerBurgerMenu(){
    setIsBurger(prev =>!prev)
  }

  const ListNav = () =>{
    return(<>
          <NavLink to="/">
            {" "}
            <li
           onClick={()=>isBurger &&  handlerBurgerMenu() }
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
              onClick={()=>isBurger &&  handlerBurgerMenu() }
              className={`${styles.navItem} ${
                location === "/setting/" ? styles.navItemActive : ""
              }`}
            >
              Настройки
            </li>
          </NavLink>
          </>)
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
        <BurgerMenu onChange={()=>handlerBurgerMenu()}
            className={styles.burgerWrap}
            checked={isBurger}/>
                    {isBurger  && <div className={styles.menuBurger}>
            <ul className={styles.navItemMenuWrap}>
          <ListNav/>
        </ul>
                      </div>}
        <ul className={styles.navItemWrap}>
          <ListNav/>
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
