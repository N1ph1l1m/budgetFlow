import { param } from "../../app/params/param";
import axios from "axios";

export async function updateTransactions({ id, description, price, date }) {
  try {
    const url = `${param.baseUser}budget/transactions/update/${id}/`;
    console.log(description, price, date);
    const response = await axios.put(url, {
      description: description,
      price: price,
      date: date,
    });
    const data = await response;
    console.log(data.status);
    if (data.status === 201) {
      console.log("success");
    }
  } catch (error) {
    console.error(`Error update : ${error}`);
  }
}
