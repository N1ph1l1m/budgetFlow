import { param } from "../../app/params/param";
import axios from "axios";
import { closeModalInput, resetUpdate } from "../../store/Slice/modalTransaction/modalTransactionSlice";
import { getTransactions } from "./getTransactions";
import { setTransaction } from "../../store/Slice/transactionsSlice/transactionsSlice";
import { AddDispatch } from "../../store";


function closeModal(dispatch:AddDispatch) {
  dispatch(closeModalInput());
  dispatch(resetUpdate());
}

interface ITransactionParam{
   transaction_id:number|null,
     description:string,
      price:number|null,
      date:string,
      category:number|null,
      type_operation:number|null
}

interface IUpdateTransaction{
  transactionParametrs:ITransactionParam,
  dispatch:AddDispatch,
}

export async function updateTransactions({ transactionParametrs,dispatch }:IUpdateTransaction) {
  try {
    const {transaction_id, description,
      price,
      date,
      category,
      type_operation} = transactionParametrs
    const url = `${param.baseUser}budget/transactions/update/${transaction_id}/`;
    const response = await axios.put(url, {
      description,
      price,
      date,
      category,
      type_operation
    });
    const data = response;
    console.log(data.status);
    if (data.status === 201 || data.status === 200) {
         const updateTransactions = await getTransactions();
         dispatch(setTransaction(await updateTransactions));
         closeModal(dispatch);
       }
  } catch (error) {
    console.error(`Error update : ${error}`);
  }
}
