import styles from "../../App/Styles/Setting.module.css";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaRegPlusSquare } from "react-icons/fa";
import { logOut } from "../../entities/logOut";
import Select from "react-select";
import pmr from "../../App/Icons/Flag_of_Transnistria_(variant).svg.png";
import { useNavigate } from "react-router";
import { FaMoneyBillWave } from "react-icons/fa";
const Setting = () => {
  const navigate = useNavigate();

  const options = [
    {
      value: "RUP",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src={pmr} style={{ width: 20 }} alt="pmr" />
          PMR
        </div>
      ),
    },
    {
      value: "RUB",
      label: <span>🇷🇺 RUB</span>,
    },
    {
      value: "USD",
      label: <span>🇺🇸 USD</span>,
    },
    {
      value: "EUR",
      label: <span> 🇪🇺 EUR</span>,
    },
  ];
  return (
    <div className={styles.wrapSetting}>
      <header>
        <h1>Настройки</h1>
      </header>

      <ul className={styles.settingList}>
        <li>
          <button className={styles.settingItem}>
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
            onChange={(selected) => console.log(selected?.value)}
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
    </div>
  );
};

export default Setting;
