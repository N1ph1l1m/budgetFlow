import axios from "axios";
import {param} from "../../app/params/param"

export async function createTransactions(description,price,category,type_operation,date) {
    try{
        const url = `${param.baseUser}/budget/create_transaction/`
        const {data} = await axios.post(url,{
    description: description,
    price: price,
    date: date,
    category: category,
    type_operation: type_operation
        })
        return data
    }catch(error){
        console.error(error)
    }

}
