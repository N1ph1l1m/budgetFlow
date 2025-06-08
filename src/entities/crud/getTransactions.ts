import axios from "axios";
import { param } from "../../app/params/param";
import {
  ICategory,
  setTransaction,
} from "../../store/Slice/transactionsSlice/transactionsSlice";
import { getListCategory } from "./getListCategory";
import { AddDispatch } from "../../store";

export interface IFetchTransactions {
  isLoaded?: boolean;
  categoryList: ICategory[];
  dispatch: AddDispatch;
}

export async function getTransactions() {
  try {
    const url = `${param.baseUser}budget/transactions/`;
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
export const fetchTransactions = async ({
  isLoaded,
  categoryList,
  dispatch,
}: IFetchTransactions) => {
  try {
    if (!isLoaded) {
      const transactionsAll = await getTransactions();
      const userId = localStorage.getItem("id");
      const transactionsUser = transactionsAll.filter(
        (item: { owner_transaction: string | null }) =>
          item.owner_transaction == userId
      );
      if (transactionsUser) {
        dispatch(setTransaction(transactionsUser));
      }
    }
    getListCategory({ categoryList, dispatch });
  } catch (error) {
    console.error(error);
  }
};
