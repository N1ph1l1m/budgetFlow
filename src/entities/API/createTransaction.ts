import axios from "axios";
import { param } from "../../app/params/param";
import { setTransaction } from "../../store/Slice/transactionsSlice/transactionsSlice";
import { getTransactions } from "./getTransactions";
import { AddDispatch } from "../../store";
import {
  closeModalInput,
  resetUpdate,
} from "../../store/Slice/modalTransaction/modalTransactionSlice";

interface ICreateTransactions {
  owner_transaction: number;
  description: string;
  price: number;
  category: number | null;
  type_operation: number;
  date: string;
  dispatch: AddDispatch;
}

function closeModal(dispatch:AddDispatch) {
  dispatch(closeModalInput());
  dispatch(resetUpdate());
}

export async function createTransactions({
  owner_transaction,
  description,
  price,
  category,
  type_operation,
  date,
  dispatch,
}: ICreateTransactions) {
  try {
    const url = `${param.baseUser}budget/create_transaction/`;
    const response = await axios.post(url, {
      owner_transaction: owner_transaction,
      description: description,
      price: price,
      date: date,
      category: category || null ,
      type_operation: type_operation,
    });
    const data =  response
    if (data.status === 201 || data.status === 200) {
      const updateTransactions = await getTransactions();
      dispatch(setTransaction(await updateTransactions));
      closeModal(dispatch);
    }
  } catch (error) {
    console.error(error);
  }
}
