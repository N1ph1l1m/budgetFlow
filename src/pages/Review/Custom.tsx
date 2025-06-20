import { ChangeEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchTransactions } from "../../entities/crud/getTransactions";
import styles from "../../app/styles/Custom.module.css";
import { ITransactionData } from "../../store/Slice/transactionsSlice/transactionsSlice";
import ListTransactions from "../../widget/ListTransactions/ListTransactions";
import {
  filteredTransactionsCustom,
  getCategorySums,
  groupByTranssaction,
} from "../../entities/listTransactions";
import {
  RateButton,
  IncomeButton,
  GeneralButton,
} from "../../shared/TransactionButtons/TransactionButtons";
import DataPieChart from "../../shared/Charts/DataPieChart";

import TransactionPlaceholder from "../../shared/TransactionPlaceholder/TransactionPlaceholder";
import { deleteItem } from "../../entities/crud/deleteTransaction";
import BarChartComponent from "../../shared/Charts/BarChart";
import { useTranslation } from "react-i18next";
const Custom = () => {
  const dispatch = useDispatch();
  const { isLoaded, categoryList, transactionState } = useSelector(
    (state: RootState) => state.transactionsSlice
  );
  const { typeTransaction } = useSelector(
    (state: RootState) => state.modalTransactionSlice
  );

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
  const [list, setList] = useState<Record<string, ITransactionData[]>>({});
  const [listSumTransactions, setListSumTransactions] = useState<
    ISumTypeOperation[]
  >([]);
  const { t} = useTranslation();

  function getCustomList() {
    const result = transactionState?.filter((item) => {
      const itemDate = item.date;
      return itemDate >= startDate && itemDate <= endDate;
    });
    return result;
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
    const arrayList = [list].flat();
    return arrayList
      ?.filter(
        (item) => item.category?.type_transaction?.name === typeOperation
      )
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

  function deleteTransaction(id: number) {
    deleteItem(id, dispatch);
  }

  return (
    <div className={styles.customWrap}>
      <header className={styles.headerWrap}>
        <h2 className={styles.titleHeader}>{t("report")}</h2>
        <div className={styles.wrapCustom}>
          <label htmlFor="start">
            <span>{t("forThePeriod")}</span>
          </label>
          <input
            className={styles.inputDate}
            value={startDate}
            onChange={handlerStartDate}
            id="start"
            type="date"
          />

          <label htmlFor="end">
            <span>{t("by")} </span>
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
        <RateButton total={listSumTransactions[0]?.rate} />
        <GeneralButton />
        <IncomeButton total={listSumTransactions[0]?.income} />
      </div>
      {Object.keys(list).length > 0 && (
        <DataPieChart data={getCategorySums(list)} />
      )}

      {typeTransaction.name === "general" ? (
        <div style={{ marginTop: "50px" }}>
          {listSumTransactions[0]?.rate == 0 &&
          listSumTransactions[0]?.income == 0 ? (
            <TransactionPlaceholder />
          ) : (
            <BarChartComponent data={listSumTransactions} width={400} />
          )}
        </div>
      ) : (
        <div className={styles.wrapList}>
          <ListTransactions list={list} deleteItem={deleteTransaction} />
        </div>
      )}
    </div>
  );
};

export default Custom;
