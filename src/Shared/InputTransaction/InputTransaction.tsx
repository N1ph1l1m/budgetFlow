import styles from "../../App/Styles/InputTransaction.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setTransaction } from "../../store/Slice/transactionsSlice/transactionsSlice";
import { useState, ChangeEvent, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'; // уникальный id
import { IoMdClose } from "react-icons/io";
import { RootState } from "../../store";
import {
  RateButton,
  IncomeButton,
} from "./TransactionButtons/TransactionButtons";
import SelectCategory from "../../widget/selectCategory/SelectCategory";

import { FaCalendarDays } from "react-icons/fa6";

interface IInputItem {
  title: string;
  typeItem: string;
  categories: ICategory[];
}
interface ICategory {
  id: number;
  key: string;
  name: string;
}
export const InputTransaction = ({ title , close}: IInputItem) => {
  const dispatch = useDispatch();
  const selectorOpeation = useSelector(
    (state: RootState) => state.transactionsSlice
  );
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState<string>(0);
  const [typeTransaction, setTypeTransaction] = useState("rate");
  const [dateTransaction,setDateTransaction] = useState("")

  // useEffect(()=>{
  //   console.log( new Date(dateTransaction))

  // },[dateTransaction])

  function handlerPrice(e: ChangeEvent<HTMLInputElement>) {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    setPrice(digitsOnly);
  }

  function handlerDataTransacton(e){
    const date  = new Date(e.target.value).toISOString()
    setDateTransaction(date)
  }

  const  handlerCategory = (item)=> {
    setCategory(item)
  }
  function handlerItemName(e: ChangeEvent<HTMLInputElement>) {
    setItemName(e.target.value);
  }

  function addItem() {
    if (!category) {
      alert("Выберите категорию");
      return;
    }
    if (!itemName) {
      alert("Введите наименование товара/услуги");
      return;
    }
    if (!price) {
      alert("Введите цену");
      return;
    }
    if (!dateTransaction) {
      alert("Введите дату");
      return;
    }
    console.log([category,itemName,price, dateTransaction])

    dispatch(
      setTransaction({
        id:  uuidv4(),
        category: category,
        itemName: itemName,
        price: price,
        date: dateTransaction,
        typeOperation: typeTransaction === "income" ? "income" : "rate",
      })
    );
    close()
  }

  function clearInput() {
    if (price == "0") {
      setPrice("");
    }
  }

  return (
    <>
      <div className={styles.mainWrap}>
        <div className={styles.headerModal}>
        <h1 className={styles.titleModal}>Новая транзакция</h1>
        <button className={styles.closeModal} onClick={close}><IoMdClose color="black" size="20"/></button>
        </div>
        <div >
          <input
            style={{ color: price  > "0" ? "black" : "gray" }}
            className={styles.inputPrice}
            value={price}
            onClick={() => clearInput()}
            onChange={(e) => handlerPrice(e)}
            inputMode="numeric"
            type="text"
            name="price"
          />
          <span style={{ fontSize: "24px" }}>{`\u20BD`}</span>
        </div>

        <div className={styles.buttonsWrap}>
          <RateButton
            typeTransaction={typeTransaction}
            onClick={() => setTypeTransaction("rate")}
          />
          <IncomeButton
            typeTransaction={typeTransaction}
            onClick={() => setTypeTransaction("income")}
          />
        </div>

        <div className={styles.inputMainWrap}>

          <SelectCategory typeTransaction={typeTransaction} selectCategory={handlerCategory}/>
          <div className={styles.inputDateWrap} >
          <div className={styles.headerDataInput}>
          <FaCalendarDays color="#fcb831 " size="40" />
            <label htmlFor="dateTransaction">
            <span className={styles.inputTitle}>Дата </span>
            </label>
          </div>

            <input className={styles.inputDate} type="date"  onChange={handlerDataTransacton} />

          </div>

        </div>
        <div   >
            <input
              placeholder="Описание"
              className={styles.inputDescription}
              onChange={(e) => handlerItemName(e)}
              value={itemName}
              type="text"
              name="nameItem"
            />
          </div>
        <button
          onClick={() => addItem()}
          className={styles.addItem}
          style={{
            backgroundColor:
              typeTransaction === "income"
                ? "rgb(93,126,88)"
                : "rgb(181,53,52)",
          }}
        >
          Добавить{" "}
        </button>
      </div>
    </>
  );
};
