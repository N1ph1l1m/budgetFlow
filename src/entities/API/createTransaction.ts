import axios from "axios";
import { param } from "../../app/params/param";

interface ICreateTransactions {
  owner_transaction:number,
  description: string;
  price: number;
  category: number;
  type_operation: number;
  date: string;
}

export async function createTransactions({
  owner_transaction,
  description,
  price,
  category,
  type_operation,
  date,
}: ICreateTransactions) {
  try {
    const url = `${param.baseUser}budget/create_transaction/`;
    console.log(date);
    const { data } = await axios.post(url, {
      owner_transaction:  owner_transaction,
      description: description,
      price: price,
      date: date,
      category: category,
      type_operation: type_operation,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}
