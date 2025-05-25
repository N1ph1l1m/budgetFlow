import axios from "axios";
import { setListCategory } from "../../store/Slice/transactionsSlice/transactionsSlice";
import { param } from "../../app/params/param";
import { IFetchTransactions } from "./getTransactions";
import { AddDispatch } from "../../store";

export async function getListCategory({
  categoryList,
  dispatch,
}: IFetchTransactions) {
  try {
    const userId = localStorage.getItem("id");
    if (categoryList.length === 0) {
      const url = `${param.baseUser}budget/categories/`;
      const respone = await axios.get(url);
      const filter = respone.data.filter(
        (item: { owner_category: { id: number | null } }) =>
          item.owner_category.id == 1 || item.owner_category.id == userId
      );
      dispatch(setListCategory(filter));
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateListCategory({
  dispatch,
}: {
  dispatch: AddDispatch;
}) {
  try {
    const url = `${param.baseUser}budget/categories/`;
    const respone = await axios.get(url);

    dispatch(setListCategory(respone.data));
  } catch (error) {
    console.error(error);
  }
}
