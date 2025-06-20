import styles from "../../app/styles/Month.module.css";
import { useState, useEffect, useCallback } from "react";
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import ListTransactions from "../../widget/ListTransactions/ListTransactions";
import { ITransactionData } from "../../store/Slice/transactionsSlice/transactionsSlice";
import {
  filteredTransactionMonth,
  groupByTranssaction,
  getCategorySums,
  filteredTransactionAllMonth,
} from "../../entities/listTransactions";
import {
  RateButton,
  IncomeButton,
  GeneralButton,
} from "../../shared/TransactionButtons/TransactionButtons";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import BarChartComponent from "../../shared/Charts/BarChart";
import DataPieChart from "../../shared/Charts/DataPieChart";
import { fetchTransactions } from "../../entities/crud/getTransactions";
import TransactionPlaceholder from "../../shared/TransactionPlaceholder/TransactionPlaceholder";
import { deleteItem } from "../../entities/crud/deleteTransaction";
import { useTranslation } from "react-i18next";

interface ISumTypeOperation {
  rate: number;
  income: number;
}
const Month = () => {
  const dispatch = useDispatch();
  const { isLoaded, categoryList } = useSelector(
    (state: RootState) => state.transactionsSlice
  );

  useEffect(() => {
    fetchTransactions({ isLoaded, categoryList, dispatch });
  }, [isLoaded, categoryList, dispatch]);

  const { i18n } = useTranslation();
  const [list, setList] = useState<Record<string, ITransactionData[]>>({});
  const [listMonth, setListMonth] = useState<ISumTypeOperation[]>([]);
  const [date, setMonth] = useState(new Date());

  const { transactionState } = useSelector(
    (state: RootState) => state.transactionsSlice
  );
  const { typeTransaction } = useSelector(
    (state: RootState) => state.modalTransactionSlice
  );

  const option: object = { month: "long", year: "numeric" };

  function changeMonth(type: string) {
    const newDate = new Date(date);
    if (type === "+") {
      const newMonth = new Date(newDate.setUTCMonth(date.getUTCMonth() + 1));
      setMonth(newMonth);
    }
    if (type === "-") {
      const newMonth = new Date(newDate.setUTCMonth(date.getUTCMonth() - 1));
      setMonth(newMonth);
    }
  }

  function sumTransactionPrice(
    list: ITransactionData[],
    typeOperation: string
  ): number {
    return list
      ?.filter((item) => item.category.type_transaction.name === typeOperation)
      .reduce((total, item) => total + Number(item.price), 0);
  }

  const filterTransition = useCallback(
    (data: Date, transactionState: ITransactionData[]) => {
      const newDate = new Date(data);
      const updatedMonth = newDate.getUTCMonth() + 1;
      const updatedYear = newDate.getUTCFullYear();

      if (!transactionState[0]) {
        setList({});
        setListMonth([]);
        return;
      }

      const filteredList = filteredTransactionMonth({
        state: transactionState,
        updatedMonth,
        updatedYear,
        transaction: typeTransaction.name,
      });
      const filteredAllMonth = filteredTransactionAllMonth({
        state: transactionState,
        updatedMonth,
        updatedYear,
      });
      const rateSUm = sumTransactionPrice(filteredAllMonth, "rate");
      const incomeSum = sumTransactionPrice(filteredAllMonth, "income");
      setListMonth([{ rate: rateSUm, income: incomeSum }]);
      setList(groupByTranssaction(filteredList));
    },
    [typeTransaction, setList]
  );

  useEffect(() => {
    filterTransition(date, transactionState);
  }, [typeTransaction, date, transactionState, filterTransition]);

  function deleteTransaction(id: number): void {
    deleteItem(id, dispatch);
  }
  return (
    <>
      <div className={styles.reviewWrap}>
        <header className={styles.headerWrap}>
          <span className={styles.headerNav} onClick={() => changeMonth("-")}>
            <IoIosArrowBack color="black" size="20" />
          </span>
          <h1 className={styles.headerTitle}>
            {date.toLocaleDateString(
              i18n.language == "ru" ? "ru-RU" : "en-EN",
              option
            )}
          </h1>
          <span className={styles.headerNav} onClick={() => changeMonth("+")}>
            <IoIosArrowForward color="black" size="20" />
          </span>
        </header>
        <div className={styles.buttonsWrap}>
          <RateButton total={listMonth[0]?.rate} />
          <GeneralButton />
          <IncomeButton total={listMonth[0]?.income} />
        </div>
        {Object.keys(list).length > 0 && (
          <DataPieChart data={getCategorySums(list)} />
        )}

        {typeTransaction.name === "general" ? (
          <div style={{ marginTop: "50px" }}>
            {listMonth[0]?.rate == 0 && listMonth[0]?.income == 0 ? (
              <TransactionPlaceholder />
            ) : (
              <BarChartComponent data={listMonth} width={200} />
            )}
          </div>
        ) : (
          <div className={styles.wrapList}>
            <ListTransactions list={list} deleteItem={deleteTransaction} />
          </div>
        )}
      </div>
    </>
  );
};
export default Month;
