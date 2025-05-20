import axios from "axios";
import { param } from "../../app/params/param";
import { setTransaction } from "../../store/Slice/transactionsSlice/transactionsSlice";

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

export const fetchTransactions = async (isLoaded, dispatch) => {
  try {
    if (!isLoaded) {
      const transactions = await getTransactions();
      if (transactions) {
        dispatch(setTransaction(transactions));
      }
    }
  } catch (error) {
    console.error(error);
  }
};
