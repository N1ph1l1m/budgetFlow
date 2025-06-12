import styles from "../../App/Styles/Setting.module.css";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaRegPlusSquare } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { logOut } from "../../entities/logOut";
import Select from "react-select";
import pmr from "../../App/icons/pmr.png";
import usa from "../../app/icons/usa.png";
import euro from "../../app/icons/euro.png";
import russia from "../../app/icons/russia.png";
import { useNavigate } from "react-router";
import { FaMoneyBillWave } from "react-icons/fa";
import Modal from "../../shared/ModalWindow/ModalTransaction";
import CreateCategory from "../../widget/createCategory/CreateCategory";
import { useState, useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { setCurrent } from "../../store/Slice/transactionsSlice/transactionsSlice";
import { FaFlagUsa } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { RootState } from "../../store";
import { forgotPassword } from "../../entities/forgotPassword";
interface SelectItemProps {
  imageSrc: string;
  title: string;
}

const SelectItem: React.FC<SelectItemProps> = ({ imageSrc, title }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <img src={imageSrc} style={{ width: 20 }} alt="pmr" />
      {title}
    </div>
  );
};

const Setting = () => {
  const [isModalCategory, setIsModalCategory] = useState(false);
  const [isModalChangePassword,setModalChangePassword] = useState(false);
  const [selectСurrency, setCurrency] = useState<string>("₽");
  const { t, i18n } = useTranslation();
  const email  = localStorage.getItem("email")
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function handlerIsModalCreateCategory() {
    setIsModalCategory((prev) => !prev);
  }
  function handlerIsModalChangePassword(){
  setModalChangePassword((prev)=>!prev)
  }

  function closeModalCreateCategory() {
    setIsModalCategory(false);
  }
    function closeModalChangePassword() {
    setModalChangePassword(false);
  }
  const optionsCurrent = [
    {
      value: "₽",
      label: <SelectItem imageSrc={`${pmr}`} title="PMR" />,
    },
    {
      value: "$",
      label: <SelectItem imageSrc={`${usa}`} title="USD" />,
    },
    {
      value: "€",
      label: <SelectItem imageSrc={`${euro}`} title="EUR" />,
    },
  ];

  const optionsLanguage = [
    {
      value: "ru",
      label: <SelectItem imageSrc={`${russia}`} title="RUS" />,
    },
    {
      value: "en",
      label: <SelectItem imageSrc={`${usa}`} title="EN" />,
    },
  ];

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };



  async function changePassword(){
    if(email){
    const result = await forgotPassword(email)
    console.log(result?.status);
    if(result?.status === 204){
      handlerIsModalChangePassword()
    }
    }else{
      alert("Почта отсуствует")
    }
  }
  useEffect(() => {
    dispatch(setCurrent(selectСurrency));
  }, [dispatch, selectСurrency]);
  return (
    <>
      {isModalCategory && (
        <Modal  title={`${t("addCategory")}`}  children={<CreateCategory/>} closeModal={()=>closeModalCreateCategory()}/>


      )}
      {isModalChangePassword && <Modal children={<p>Сылка на смену пароля отправлено на почту</p>}  title="Смена пароля"
      closeModal={()=> closeModalChangePassword()}/>}

      <div className={styles.wrapSetting}>
        <header>
          <h1>{t("setting")}</h1>
        </header>

        <ul className={styles.settingList}>
          <li>
            <button
              className={styles.settingItem}
              onClick={() => handlerIsModalCreateCategory()}
            >
              <FaRegPlusSquare size={25} />
              <span className={styles.titleSettingItem}>
                {t("addCategory")}
              </span>
            </button>
          </li>
          <li className={styles.settingItem}>
            <FaMoneyBillWave size={25} />
            <p className={styles.titleSettingItem}>{t("current")}</p>
            <Select
              className={styles.selectCustom}
              options={optionsCurrent}
              onChange={(selected) => setCurrency(selected?.value ?? "₽")}
            />
          </li>
          <li className={styles.settingItem}>
            <FaFlagUsa size={25} />
            <p className={styles.titleSettingItem}>{t("language")}</p>
            <Select
              className={styles.selectCustom}
              options={optionsLanguage}
              onChange={(selected) => changeLanguage(selected?.value ?? "ru")}
            />
          </li>
         <li>
            <button
              className={styles.settingItem}
              onClick={() => changePassword()}
            >
              <RiLockPasswordLine size={25} />
              <span className={styles.titleSettingItem}>
                {t("changePassword")}
              </span>
            </button>
          </li>
          <li>
            <button
              className={styles.settingItem}
              onClick={() => logOut(navigate)}
            >
              <RiLogoutBoxRLine size={25} />
              <p className={styles.titleSettingItem}>{t("quit")}</p>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Setting;
