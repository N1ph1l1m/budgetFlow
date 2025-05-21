import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface  ITypeTransaction{
  id:number,
  name:string,
}

export interface ICategory{
  id:number,
  name:string,
  icon:string,
  type_transaction:ITypeTransaction,
  owner_category:IOwnerCategory[],
}
interface IOwnerCategory{
  id:number,
  username?:string
}

export interface ITransactionData{
  id: number;
  category: ICategory;
  description: string;
  price: number;
  date: string;
}


interface ITransaction {
  transactionState: ITransactionData[];
  categoryList:ICategory[]
  isLoaded:boolean
}

const initialState: ITransaction = {
  categoryList:[],
  isLoaded:false,
  transactionState:[]
};

const transactionsSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransaction(state, action: PayloadAction<ITransactionData>) {
      state.transactionState = [action.payload];
      state.isLoaded = true;
    },
    deleteTransaction(state, actions: PayloadAction<number>) {
      const filteredData = state.transactionState.filter(
        (item) => item.id !== actions.payload
      );
      state.transactionState = filteredData;
    },
    setListCategory(state,action:PayloadAction<ICategory[]>){
      state.categoryList = action.payload;
    }
  },
});
export const { setTransaction, deleteTransaction,setListCategory } = transactionsSlice.actions;
export default transactionsSlice.reducer;
