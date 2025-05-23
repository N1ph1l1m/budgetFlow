import styles from "../../App/Styles/Setting.module.css";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaRegPlusSquare } from "react-icons/fa";
import { logOut } from "../../entities/logOut";
import Select from "react-select";
import pmr from "../../App/icons/pmr.png"
import rus from "../../app/icons/russia.png";
import usa from "../../app/icons/usa.png";
import euro from "../../app/icons/euro.png";
import { useNavigate } from "react-router";
import { FaMoneyBillWave } from "react-icons/fa";
import Modal from "../../widget/ModalWindow/ModalTransaction";
import CreateCategory from "../../widget/createCategory/CreateCategory";
import { useState,useEffect, SetStateAction } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setCurrent} from "../../store/Slice/transactionsSlice/transactionsSlice";
import { RootState } from "../../store";
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
  const  [isModalCategory,setIsModalCategory] = useState(false)
  const [selectСurrency,setCurrency] = useState<SetStateAction<string>>("PMR")
  const navigate = useNavigate();
  const {current}  = useSelector((state:RootState)=>state.transactionsSlice)
  const dispatch = useDispatch()

  function hanlderIsModal(){
    setIsModalCategory(prev=>!prev)
  }
  function closeModal(){
    setIsModalCategory(false)
  }
  const options = [
    {
      value: "RUP",
      label: <SelectItem imageSrc={`${pmr}`} title="PMR"/>
      ,
    },
    {
      value: "RUB",
      label:  <SelectItem imageSrc={`${rus}`} title="RUB"/>,
    },
    {
      value: "USD",
      label:  <SelectItem imageSrc={`${usa}`} title="USD"/>,
    },
    {
      value: "EUR",
      label: <SelectItem imageSrc={`${euro}`} title="EUR"/>,
    },
  ];

  useEffect(()=>{dispatch(setCurrent(selectСurrency))},[selectСurrency])
  return (
    <>
    {isModalCategory && <Modal><CreateCategory closeModal={()=>closeModal()}/></Modal>}
        <div className={styles.wrapSetting}>
      <header>
        <h1>Настройки</h1>
      </header>

      <ul className={styles.settingList}>
        <li>
          <button className={styles.settingItem} onClick={()=>hanlderIsModal()}>
            <FaRegPlusSquare size={25} />
            <span className={styles.titleSettingItem}>Добавить категорию</span>
          </button>
        </li>
        <li className={styles.settingItem}>
          <FaMoneyBillWave size={25} />
          <span className={styles.titleSettingItem}>Валюта</span>
          <Select
            className={styles.selectCustom}
            options={options}
            onChange={(selected) => setCurrency(selected?.value ?? "PMR")}
          />
        </li>
        <li>
          <button
            className={styles.settingItem}
            onClick={() => logOut(navigate)}
          >
            <RiLogoutBoxRLine size={25} />
            <span className={styles.titleSettingItem}>Выйти</span>
          </button>
        </li>
      </ul>
      <span>{current}</span>
    </div></>
  );
};

export default Setting;
