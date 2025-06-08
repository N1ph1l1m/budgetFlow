import {param} from "../../app/params/param";
import axios from "axios";
import { deleteTransaction } from "../../store/Slice/transactionsSlice/transactionsSlice";
import { AddDispatch } from "../../store";
export async  function deleteTransactionToId(id:number){
    try{
        const url = `${param.baseUser}budget/transactions/${id}/`
        const response = await axios.delete(url)
        const data =  response.status
        if(data === 204){
            return data
        }
    }catch(error){
        console.error(`Error delete transaction \n:${error}`)
    }
}





  export async function deleteItem(id:number,dispatch:AddDispatch){
    try{
  const request =  await deleteTransactionToId(id)
    if(request === 204){
    dispatch(deleteTransaction(id))
    }else{console.log("Error delete transaction");}
    }catch(error){
      console.error(error)
    }


  }
