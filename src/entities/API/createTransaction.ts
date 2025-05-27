import axios from "axios";
import { param } from "../../app/params/param";
import { setTransaction } from "../../store/Slice/transactionsSlice/transactionsSlice";
import { getTransactions } from "./getTransactions";
import { AddDispatch } from "../../store";
import {
  closeModalInput,
  resetCategory,
  resetUpdate,
} from "../../store/Slice/modalTransaction/modalTransactionSlice";

interface ICreateTransactions {
  owner_transaction: number;
  description: string;
  price: number;
  category: number;
  type_operation: number;
  date: string;
  dispatch: AddDispatch;
}

function closeModal(dispatch) {
  dispatch(closeModalInput());
  dispatch(resetUpdate());
  dispatch(resetCategory());
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
    console.log(date);
    const { data } = await axios.post(url, {
      owner_transaction: owner_transaction,
      description: description,
      price: price,
      date: date,
      category: category,
      type_operation: type_operation,
    });
    if (data.status === 201) {
      const updateTransactions = await getTransactions();
      dispatch(setTransaction(await updateTransactions));
      closeModal(dispatch);
    }
  } catch (error) {
    console.error(error);
  }
}
