import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type  typeTransaction = "rate" | "income" | "general"
interface ISelectCategory{
    name:string,
    icon:string
}
interface IModalTransaction{
    modalInput:boolean,
    modalCategory:boolean ,
    typeTransaction:typeTransaction,
    selectCategory:ISelectCategory[],
}

const initialState:IModalTransaction  = {
    modalInput:false,
    modalCategory:false,
    typeTransaction:"rate",
    selectCategory:[],
}

const modalTransactionSlice = createSlice({
    name:'modalTransaction',
    initialState,
    reducers:{
        isModalInput(state){
            state.modalInput = true;
        },
        closeModalInput(state){
            state.modalInput = false;
        },
        isModalCategory(state){
            state.modalCategory = true;
        },
        closeModalCategory(state){
            state.modalCategory = false;
        },
        rateTransaction(state){
            state.typeTransaction = 'rate'
        },
        incomeTransaction(state){
            state.typeTransaction = 'income'
        },
         generalTransaction(state){
            state.typeTransaction = 'general'
        },
        setSelectCategory(state,action:PayloadAction<ISelectCategory[]>){
            state.selectCategory = action.payload;
        },
        resetCategory(state){
            state.selectCategory = [];
        }
    }

})
export const {isModalInput,closeModalInput, isModalCategory,closeModalCategory, rateTransaction, incomeTransaction,setSelectCategory , resetCategory , generalTransaction} = modalTransactionSlice.actions;
export default modalTransactionSlice.reducer;
