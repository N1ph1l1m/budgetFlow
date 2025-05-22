import { ChangeEvent, useState,useCallback, useEffect, FormEvent, useRef } from "react";
import { useDispatch, useSelector,} from "react-redux";
import { RootState } from "../../store";
import { fetchTransactions } from "../../entities/API/getTransactions";
import styles from "../../app/styles/Custome.module.css";
import { ITransactionData } from "../../store/Slice/transactionsSlice/transactionsSlice";
import ListTransactions from "../../widget/ListTransactions/ListTransactions";
import { filteredTransactionsCustom, groupByTranssaction } from "../../entities/listTransactions";
import {
  RateButton,
  IncomeButton,
  GeneralButton,
} from "../../shared/TransactionButtons/TransactionButtons";
const Custom = () => {
  const dispatch = useDispatch();
  const { isLoaded, categoryList, transactionState } = useSelector(
    (state: RootState) => state.transactionsSlice
  );
  const {typeTransaction} = useSelector((state:RootState)=>state.modalTransactionSlice)

  useEffect(() => {
    fetchTransactions({ isLoaded, categoryList, dispatch });
  }, [isLoaded, categoryList, dispatch]);

  const getToday = () => {
    const today = new Date();

    return today.toISOString().split("T")[0];
  };

  const [startDate, setStartDate] = useState<string>(getToday());
  const [endDate, setEndDate] = useState<string>(getToday());
  const [list, setList] = useState<Record<string, ITransactionData[]>>({});
  const [dataCustome,setDataCustome] =  useState<Record<string, ITransactionData[]>>({});

  const prevStartData = useRef<string | null>(null);
  const prevEndData = useRef<string | null>(null);

  function getCustomList() {
    const transaction = [transactionState[0]].flat();
    const result = transaction?.filter((item) => {
      const itemDate = item.date;
      return itemDate >= startDate && itemDate <= endDate;
    });
    return result
  }

  function handlerStartDate(e: ChangeEvent<HTMLInputElement>) {
    prevStartData.current = startDate;
    setStartDate(e.target.value);
  }

  function handlerEndDate(e: ChangeEvent<HTMLInputElement>) {
    prevEndData.current = endDate;
    setEndDate(e.target.value);
  }


  function showCustomData(e: FormEvent) {
    e.preventDefault();
    const getCustomeData = getCustomList()
    // setDataCustome(getCustomeData)
    console.log(getCustomeData);
       const filterType  = filteredTransactionsCustom({state:getCustomeData,transaction:typeTransaction[0].name})
       setList(groupByTranssaction(filterType))
    console.log(filterType);
  }






  return (
    <div className={styles.customWrap}>
      <header className={styles.headerWrap}>
        <h2 className={styles.titleHeader}>Отчет за период</h2>
        <form onSubmit={showCustomData}>
          <label htmlFor="start">
            <span>За период с </span>
          </label>
          <input
            className={styles.inputDate}
            value={startDate}
            onChange={handlerStartDate}
            id="start"
            type="date"
          />

          <label htmlFor="end">
            <span>по </span>
          </label>
          <input
            className={styles.inputDate}
            value={endDate}
            onChange={handlerEndDate}
            id="end"
            type="date"
          />
          <button type="submit" className={styles.customButtom}>
            Показать{" "}
          </button>
        </form>
      </header>

      <div className={styles.buttonsWrap}>
        <RateButton />
        <GeneralButton />
        <IncomeButton />
      </div>
      <ListTransactions list={list} />
    </div>
  );
};

export default Custom;
