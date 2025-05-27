import styles from "../../App/Styles/InputTransaction.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { RootState } from "../../store";
import {
  closeModalInput,
  resetCategory,
  setTransactionName,
  setPriceTransaction,
  setDateTransaction,
  resetUpdate,
} from "../../store/Slice/modalTransaction/modalTransactionSlice";
import {
  RateButton,
  IncomeButton,
} from "../TransactionButtons/TransactionButtons";
import SelectCategory from "../../widget/selectCategory/SelectCategory";
import { createTransactions } from "../../entities/API/createTransaction";
import { FaCalendarDays } from "react-icons/fa6";
import { getTransactions } from "../../entities/API/getTransactions";
import { formatDate } from "../../entities/formarDateToServer";
import { updateTransactions } from "../../entities/API/updateTransaction";

export const InputTransaction = () => {
  const dispatch = useDispatch();

  const {
    typeTransaction,
    selectCategory,
    transactionName,
    price,
    dateTransaction,
    isUpdate,
    transaction_id,
  } = useSelector((state: RootState) => state.modalTransactionSlice);

  // useEffect(() => {
  //   console.log(dateTransaction);
  // }, []);

  function handlerPrice(e: ChangeEvent<HTMLInputElement>) {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    const parsed = parseInt(digitsOnly, 10);
    dispatch(setPriceTransaction(Number.isNaN(parsed) ? null : parsed));
  }

  function handlerDataTransacton(e: ChangeEvent<HTMLInputElement>) {
    const format = formatDate(e.target.value);
    dispatch(setDateTransaction(format));
  }

  function handlerItemName(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setTransactionName(e.target.value));
  }

  function closeModal() {
    dispatch(closeModalInput());
    dispatch(resetUpdate());
  }

  async function submitTransaction() {
    const userId = localStorage.getItem("id");
    const date = new Date().toISOString();
    if (!selectCategory) {
      alert("Выберите категорию");
      return;
    }
    if (!transactionName) {
      alert("Введите наименование товара/услуги");
      return;
    }
    if (!price) {
      alert("Введите цену");
      return;
    }
    try {
      if (isUpdate) {
        await updateTransactions({
          id: transaction_id,
          description: transactionName,
          date: formatDate(date),
          price: price,
        });
      } else {
        await createTransactions({
          owner_transaction: Number(userId),
          description: transactionName,
          price: price,
          category: selectCategory[0].id,
          type_operation: typeTransaction.id,
          date: dateTransaction || formatDate(date),
          dispatch,
        });
      }
    } catch (error) {
      console.error("Ошибка при создании транзакции:", error);
      alert("Произошла ошибка при добавлении транзакции. Попробуйте ещё раз.");
    }

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
            value={price ?? ""}
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
            value={transactionName}
            type="text"
            name="nameItem"
          />
        </div>
        <button
          onClick={() => submitTransaction()}
          className={styles.addItem}
          style={{
            backgroundColor:
              typeTransaction.name === "income"
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
