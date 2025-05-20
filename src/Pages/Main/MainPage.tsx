import styles from "../../App/Styles/Main.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useCallback, useEffect, useState } from "react";
import { ITransactionData } from "../../store/Slice/transactionsSlice/transactionsSlice";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
  RateButton,
  IncomeButton,
} from "../../shared/TransactionButtons/TransactionButtons";
import {
  filteredTransactions,
  groupByTranssaction,
  getCategorySums,
} from "../../entities/listTransactions";
import ListTransactions from "../../widget/ListTransactions/ListTransactions";
import DataPieChart from "../../shared/Charts/DataPieChart";
import { fetchTransactions } from "../../entities/API/getTransactions";
import { getListCategory } from "../../entities/API/getListCategory";
export const MainPage = () => {
  const dispatch = useDispatch();
  const { isLoaded, transactionState, categoryList } = useSelector(
    (state: RootState) => state.transactionsSlice
  );

  useEffect(() => {
    fetchTransactions(isLoaded, dispatch);
    getListCategory(categoryList, dispatch);
  }, [isLoaded, dispatch, transactionState]);

  const { typeTransaction } = useSelector(
    (state: RootState) => state.modalTransactionSlice
  );
  const [date, setDate] = useState(new Date());
  const [list, setList] = useState<Record<string, ITransactionData[]>>({});
  const [sumRate, setSumRate] = useState<number>(0);
  const [sumIncome, setSumIncome] = useState<number>(0);

  function changeDay(type: string) {
    const newDate = new Date(date);
    if (type === "+") {
      newDate.setUTCDate(date.getUTCDate() + 1);
    } else if (type === "-") {
      newDate.setUTCDate(date.getUTCDate() - 1);
    }
    setDate(newDate);
  }

  function sumTransaction(filtered: ITransactionData[]): number {
    return filtered?.reduce((acc, item) => acc + item.price, 0);
  }

  const filterTransition = useCallback(
    (data: Date, transactionState: ITransactionData[]) => {
      const state = transactionState[0];

      if (!state) {
        setList({});
        setSumRate(0);
        setSumIncome(0);
        return;
      }

      const newDate = new Date(data);
      const updatedDay = newDate.getUTCDate();
      const updatedMonth = newDate.getUTCMonth() + 1;
      const updatedYear = newDate.getUTCFullYear();

      const filteredList = filteredTransactions({
        state: state,
        updatedDay,
        updatedMonth,
        updatedYear,
        transaction: typeTransaction[0].name,
      });

      const filteredRate = filteredTransactions({
        state,
        updatedDay,
        updatedMonth,
        updatedYear,
        transaction: "rate",
      });

      const filteredIncome = filteredTransactions({
        state,
        updatedDay,
        updatedMonth,
        updatedYear,
        transaction: "income",
      });

      setList(groupByTranssaction(filteredList));
      setSumRate(sumTransaction(filteredRate));
      setSumIncome(sumTransaction(filteredIncome));
    },
    [typeTransaction, setList, setSumRate, setSumIncome]
  );

  useEffect(() => {
    filterTransition(date, transactionState);
  }, [typeTransaction, date, transactionState, filterTransition]);

  const option: object = { month: "long", day: "numeric", year: "numeric" };
  return (
    <>
      <div className={styles.mainWrap}>
        <header className={styles.headerWrap}>
          <span className={styles.headerNav} onClick={() => changeDay("-")}>
            <IoIosArrowBack color="black" size="20" />
          </span>
          <h1 className={styles.headerTitle}>
            {date.toLocaleDateString("ru-RU", option)}
          </h1>
          <span className={styles.headerNav} onClick={() => changeDay("+")}>
            <IoIosArrowForward color="black" size="20" />
          </span>
        </header>

        <div className={styles.buttonsWrap}>
          <RateButton total={sumRate ? sumRate : null} large />
          <IncomeButton total={sumIncome ? sumIncome : null} large />
        </div>
        {Object.keys(list).length > 0 ? (
          <div className={styles.listWrapContainer}>
            <div className={styles.wrapGraph}>
              <DataPieChart data={getCategorySums(list)} />
            </div>
            <div className={styles.wrapList}>
              <ListTransactions list={list} />
            </div>
          </div>
        ) : (
          <ListTransactions list={list} />
        )}
      </div>
    </>
  );
};
