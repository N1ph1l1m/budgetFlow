import styles from "../../App/Styles/Today.module.css";
import { useState, useEffect, useCallback } from "react";
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import ListTransactions  from "../../widget/ListTransactions/ListTransactions";
import {ITransactionData} from "../../store/Slice/transactionsSlice/transactionsSlice"
import { filteredTransactions , groupByTranssaction,getCategorySums} from "../../entities/listTransactions";
import { RateButton,IncomeButton } from "../../shared/TransactionButtons/TransactionButtons";

import DataPieChart from "../../shared/Charts/DataPieChart";

export const Today = () => {

  const [list, setList] = useState<Record<string, ITransactionData[]>>({});
  const dispatch = useDispatch();

  const date  = new Date()
  const {transactionState}  = useSelector(
    (state: RootState) => state.transactionsSlice);
  const {typeTransaction} = useSelector((state:RootState)=>state.modalTransactionSlice)

    const option: object = { month:  "long", day: "numeric" };

    const filterTransition = useCallback(
      (data: Date, transactionState: ITransactionData[]) => {
        const state = transactionState;

        const newDate = new Date(data);
        const updatedDay = newDate.getUTCDate();
        const updatedMonth = newDate.getUTCMonth() + 1;

        const filteredList = filteredTransactions({
          state,
          updatedDay,
          updatedMonth,
          transaction: typeTransaction,
        });
        setList(groupByTranssaction(filteredList));
      },
          [typeTransaction, setList]
    );

      useEffect(() => {
    filterTransition(date, transactionState);
  }, [typeTransaction, transactionState, filterTransition]);

  return (
    <>

      <div className={styles.reviewWrap}>
         <h1 className={styles.headerTitle}>
           <div className={styles.buttonsWrap}>
          <RateButton  />
          <IncomeButton  />
        </div>
          {date.toLocaleDateString("ru-RU", option)}
        </h1>
          { Object.keys(list).length >  0 && <DataPieChart data={getCategorySums(list)}/> }
        <div className={styles.wrapList}>
                <ListTransactions  list={list}/>
        </div>

      </div>
    </>
  );
};
