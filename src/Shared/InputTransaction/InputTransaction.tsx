import styles from "../../App/Styles/InputTransaction.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setTransaction } from "../../store/Slice/transactionsSlice/transactionsSlice";
import { useState, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid"; // уникальный id
import { IoMdClose } from "react-icons/io";
import { RootState } from "../../store";
import { closeModalInput,resetCategory } from "../../store/Slice/modalTransaction/modalTransactionSlice";
import {
  RateButton,
  IncomeButton,
} from "../TransactionButtons/TransactionButtons";
import SelectCategory from "../../widget/selectCategory/SelectCategory";

import { FaCalendarDays } from "react-icons/fa6";

export const InputTransaction = () => {
  const dispatch = useDispatch();

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState<number | null>(null);

  const [dateTransaction, setDateTransaction] = useState("");
  const { typeTransaction, selectCategory } = useSelector(
    (state: RootState) => state.modalTransactionSlice
  );

 function handlerPrice(e: ChangeEvent<HTMLInputElement>) {
  const digitsOnly = e.target.value.replace(/\D/g, '');
  const parsed = parseInt(digitsOnly, 10);
  setPrice(Number.isNaN(parsed) ? null : parsed);
}

  function handlerDataTransacton(e: ChangeEvent<HTMLInputElement>) {
    const date = new Date(e.target.value).toISOString();
    setDateTransaction(date);
  }

  function handlerItemName(e: ChangeEvent<HTMLInputElement>) {
    setItemName(e.target.value);
  }

  function closeModal() {
    dispatch(closeModalInput());
  }
  function addItem() {
    const date  =    new Date().toISOString();
    if (!selectCategory) {
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


    dispatch(
      setTransaction({
        id: parseInt(uuidv4()),
        category: selectCategory,
        itemName: itemName,
        price: price ,
        date: dateTransaction || date,
        typeOperation: typeTransaction === "income" ? "income" : "rate",
      })
    );
    closeModal();
    resetCategory();
  }

  return (
    <>
      <div className={styles.mainWrap}>
        <div className={styles.headerModal}>
          <h1 className={styles.titleModal}>Новая транзакция</h1>
          <button className={styles.closeModal} onClick={() => closeModal()}>
            <IoMdClose color="black" size="20" />
          </button>
        </div>
        <div>
          <input

            className={styles.inputPrice}
            value={price ?? ''}
            onChange={(e) => handlerPrice(e)}
            inputMode="numeric"
            type="text"
            name="price"
            placeholder="0"
          />
          <span style={{ fontSize: "24px" }}>{`\u20BD`}</span>
        </div>

        <div className={styles.buttonsWrap}>
          <RateButton />
          <IncomeButton />
        </div>

        <div className={styles.inputMainWrap}>
          <SelectCategory />
          <div className={styles.inputDateWrap}>
            <div className={styles.headerDataInput}>
              <FaCalendarDays color="#fcb831 " size="40" />
              <label htmlFor="dateTransaction">
                <span className={styles.inputTitle}>Дата </span>
              </label>
            </div>

            <input
              className={styles.inputDate}
              type="date"
              onChange={handlerDataTransacton}
            />
          </div>
        </div>
        <div>
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
