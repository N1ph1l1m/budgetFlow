import styles from "../../app/styles/InputTransaction.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent } from "react";
import { RootState } from "../../store";
import {
  closeModalInput,
  resetUpdate,
  setDateTransaction,
  setDescriptionTransaction,
  setPriceTransaction,
} from "../../store/Slice/modalTransaction/modalTransactionSlice";
import {
  RateButton,
  IncomeButton,
} from "../TransactionButtons/TransactionButtons";
import SelectCategory from "../../widget/selectCategory/SelectCategory";
import { createTransactions } from "../../entities/crud/createTransaction";
import { FaCalendarDays } from "react-icons/fa6";
import { formatDate } from "../../entities/formatDateToServer";
import { updateTransactions } from "../../entities/crud/updateTransaction";
import { useTranslation } from "react-i18next";
import {
  createError,
  resetNotification,
} from "../../store/Slice/notificationSlice/notificationSlice";

export const InputTransaction = () => {
  const dispatch = useDispatch();

  const { typeTransaction, isUpdate, updateCategory } = useSelector(
    (state: RootState) => state.modalTransactionSlice
  );
  const { current } = useSelector(
    (state: RootState) => state.transactionsSlice
  );
  const { t } = useTranslation();
  const { description, date, price, category, type_operation, transaction_id } =
    useSelector(
      (state: RootState) => state.modalTransactionSlice.transactionParametrs
    );

  function handlerPrice(e: ChangeEvent<HTMLInputElement>) {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    const parsed = parseInt(digitsOnly, 10);
    dispatch(setPriceTransaction(parsed));
  }

  function handlerDataTransacton(e: ChangeEvent<HTMLInputElement>) {
    const format = formatDate(e.target.value);
    dispatch(setDateTransaction(format));
  }

  function handlerItemName(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setDescriptionTransaction(e.target.value));
  }

  function closeModal() {
    dispatch(closeModalInput());
    dispatch(resetUpdate());
    dispatch(resetNotification());
  }

  async function submitTransaction() {
    const userId = localStorage.getItem("id");
    const dateNow = new Date().toISOString();

    const checkCategory = Object.values(category).every(
      (value) => value !== null && value !== "" && value !== undefined
    );
    console.log(checkCategory);
    if (!checkCategory) {
      dispatch(createError(t("errorSelectCategory")));
      return;
    }
    if (!description) {
      dispatch(createError(t("enterTransaction")));

      return;
    }
    if (!price) {
      dispatch(createError(t("enterPrice")));
      return;
    }

    const finalDate = date ? formatDate(date) : formatDate(dateNow);
    try {
      if (isUpdate) {
        await updateTransactions({
          transactionParametrs: {
            transaction_id,
            description,
            date: formatDate(date),
            category: updateCategory ? updateCategory : category?.id ?? null,
            price: price,
            type_operation,
          },
          dispatch,
        });
      } else {
        await createTransactions({
          owner_transaction: Number(userId),
          description: description,
          price: price,
          category: category.id,
          type_operation: typeTransaction.id,
          date: finalDate,
          dispatch,
        });
      }
    } catch (error) {
      dispatch(createError(`${t("errorInputTransaction")} \n ${error}`));
      alert(t("errorInputTransaction"));
    }

    closeModal();
  }

  return (
    <>
      <div className={styles.mainWrap}>
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
          <span className={styles.current}>{current}</span>
        </div>

        <div className={styles.buttonsWrap}>
          <RateButton />
          <IncomeButton />
        </div>

        <div className={styles.inputMainWrap}>
          <div className={styles.selectWrap}>
            {" "}
            <SelectCategory />
          </div>
          <div className={styles.inputDateWrap}>
            <div className={styles.headerDataInput}>
              <FaCalendarDays color="#fcb831 " size="40" />
              <label htmlFor="dateTransaction">
                <span className={styles.inputTitle}>{t("date")}</span>
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
            placeholder={t("description")}
            className={styles.inputDescription}
            onChange={(e) => handlerItemName(e)}
            value={description}
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
          {t("addTransaction")}
        </button>
      </div>
    </>
  );
};
