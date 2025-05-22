import styles from "../../App/Styles/Month.module.css";
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
import { fetchTransactions } from "../../entities/API/getTransactions";


interface ISumTypeOperation {
  rate: number;
  income: number;
}
const Month = () => {
  const dispatch = useDispatch();
  const { isLoaded,categoryList } = useSelector(
    (state: RootState) => state.transactionsSlice
  );

  useEffect(() => {
    fetchTransactions({isLoaded,categoryList, dispatch});
  }, [isLoaded, categoryList,dispatch]);

  const [list, setList] = useState<Record<string,ITransactionData[]>>({});
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
        state:[transactionState[0]],
        updatedMonth,
        updatedYear,
        transaction: typeTransaction[0].name,
      });
      const filteredAllMonth = filteredTransactionAllMonth({
        state:[transactionState[0]],
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

  // useEffect(()=>{console.log(list);},[list])

  return (
    <>
      <div className={styles.reviewWrap}>
        <header className={styles.headerWrap}>
          <span className={styles.headerNav} onClick={() => changeMonth("-")}>
            <IoIosArrowBack color="black" size="20" />
          </span>
          <h1 className={styles.headerTitle}>
            {date.toLocaleDateString("ru-RU", option)}
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
        <div className={styles.wrapList}>
          <ListTransactions list={list} />
        </div>
        {typeTransaction[0].name === "general" && (
          <div style={{ marginTop: "50px" }}>
            {" "}
            <BarChartComponent data={listMonth} width={400} />
          </div>
        )}
      </div>
    </>
  );
};
export default Month;
