import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
    id: number;
    itemName: string;
    price: string;
    date: Date;
    typeOperation: string;
  }

  const initialState: Transaction[] = [];


const transactionsSlice = createSlice({
    name:"transaction",
    initialState,
    reducers:{
        setTransaction(state,action:PayloadAction<Transaction>){
            state.push(action.payload)
        }
    }

})
export const {setTransaction} = transactionsSlice.actions;
export default transactionsSlice.reducer;
