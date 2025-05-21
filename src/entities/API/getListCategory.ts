import axios from "axios";
import { setListCategory } from "../../store/Slice/transactionsSlice/transactionsSlice";
import { param } from "../../app/params/param";
import { IFetchTransactions } from "./getTransactions";

export async function getListCategory({categoryList, dispatch}:IFetchTransactions) {
  try {

    if (categoryList.length === 0) {
      const url = `${param.baseUser}budget/categories/`;
      const respone = await axios.get(url);
      dispatch(setListCategory(respone.data));
    }
  } catch (error) {
    console.error(error);
  }
}
