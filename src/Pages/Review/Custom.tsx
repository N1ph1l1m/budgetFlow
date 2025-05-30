import { ChangeEvent, useState,useEffect } from "react";
import { useDispatch, useSelector,} from "react-redux";
import { RootState } from "../../store";
import { fetchTransactions } from "../../entities/API/getTransactions";
import styles from "../../app/styles/Custome.module.css";
import { ITransactionData } from "../../store/Slice/transactionsSlice/transactionsSlice";
import ListTransactions from "../../widget/ListTransactions/ListTransactions";
import { filteredTransactionsCustom, getCategorySums, groupByTranssaction } from "../../entities/listTransactions";
import {
  RateButton,
  IncomeButton,
  GeneralButton,
} from "../../shared/TransactionButtons/TransactionButtons";
import DataPieChart from "../../shared/Charts/DataPieChart";
import BarChartComponent from "../../shared/Charts/BarChart";
import { deleteTransaction } from "../../store/Slice/transactionsSlice/transactionsSlice";
import TransactionPlaceholder from "../../shared/TransactionPlaceholder/TransactionPlaceholder";
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

  interface ISumTypeOperation {
  rate: number;
  income: number;
}
  const [startDate, setStartDate] = useState<string>(getToday());
  const [endDate, setEndDate] = useState<string>(getToday());
  const [list, setList] = useState<Record<string,ITransactionData[]>>({});
  const [listSumTransactions,setListSumTransactions] = useState<ISumTypeOperation[]>([])


  function getCustomList() {
    const result = transactionState?.filter((item) => {
      const itemDate = item.date;
      return itemDate >= startDate && itemDate <= endDate;
    });
    return result
  }

  function handlerStartDate(e: ChangeEvent<HTMLInputElement>) {
    setStartDate(e.target.value);
  }

  function handlerEndDate(e: ChangeEvent<HTMLInputElement>) {
    setEndDate(e.target.value);
  }

    function sumTransactionPrice(
    list: ITransactionData[],
    typeOperation: string
  ): number {
    const arrayList  = [list].flat()
    return arrayList?.filter((item) => item.category?.type_transaction?.name === typeOperation)
      .reduce((total, item) => total + Number(item.price), 0);
  }


useEffect(() => {
  const getCustomeData = getCustomList();

  const filterType = filteredTransactionsCustom({
    state: getCustomeData,
    transaction: typeTransaction.name,
  });
  setList(groupByTranssaction(filterType));

  const rateSum = sumTransactionPrice(getCustomeData, "rate");
  const incomeSum = sumTransactionPrice(getCustomeData, "income");
  setListSumTransactions([{ rate: rateSum, income: incomeSum }]);
}, [transactionState, typeTransaction.name, startDate, endDate]);


useEffect(() => {
  const getCustomeData = getCustomList();

  const filterType = filteredTransactionsCustom({
    state: getCustomeData,
    transaction: typeTransaction.name,
  });
  setList(groupByTranssaction(filterType));

  const rateSum = sumTransactionPrice(getCustomeData, "rate");
  const incomeSum = sumTransactionPrice(getCustomeData, "income");
  setListSumTransactions([{ rate: rateSum, income: incomeSum }]);
}, [transactionState, typeTransaction.name, startDate, endDate]);

  function deleteItem(id:number){
    dispatch(deleteTransaction(id))
  }

  useEffect(()=>{console.log(listSumTransactions);},[listSumTransactions])


  return (
    <div className={styles.customWrap}>
      <header className={styles.headerWrap}>
        <h2 className={styles.titleHeader}>Отчет за период</h2>
        <div className={styles.wrapCustom}>
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

        </div>
      </header>

      <div className={styles.buttonsWrap}>
        <RateButton total = {listSumTransactions[0]?.rate}/>
        <GeneralButton />
           <IncomeButton total={listSumTransactions[0]?.income} />
      </div>
        {Object.keys(list).length > 0 && (
          <DataPieChart data={getCategorySums(list)} />
        )}

          {typeTransaction.name === "general" ? (
          <div style={{ marginTop: "50px" }}>
            {listSumTransactions[0]?.rate == 0 && listSumTransactions[0]?.income == 0   ? <TransactionPlaceholder/> :<BarChartComponent data={listSumTransactions} width={400} />}
          </div>
        ):  <div className={styles.wrapList}>
          <ListTransactions list={list} deleteItem={deleteItem} />
        </div>}
    </div>
  );
};

export default Custom;
