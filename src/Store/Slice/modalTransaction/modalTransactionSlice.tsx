import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface TypeTransaction {
  id: number;
  name: string;
}

export interface ISelectCategory {
  id: number | null;
  name: string;
  icon: string;
}

export interface ITransactionParametrs{
  transaction_id: number |null,
  description: string,
  price: number| null,
  date: string,
  category: ISelectCategory,
  type_operation:number |null,
}


interface IModalTransaction {
  modalInput: boolean;
  isUpdate: boolean;
  modalCategory: boolean;
  modalForgotPassword:boolean;
  modalSignUp:boolean;
  modalChangePassword:boolean,
  typeTransaction: TypeTransaction;
  transactionParametrs:ITransactionParametrs,
  updateCategory:number|null,

}
const initialState: IModalTransaction = {
  modalInput: false,
  isUpdate: false,
  modalCategory: false,
  modalForgotPassword:false,
  modalSignUp:false,
  modalChangePassword:false,
  typeTransaction: { id: 1, name: "rate" },
  transactionParametrs:{
    transaction_id: null,
    description: "",
    price: null,
    date: "",
    category: {id:null,name:"",icon:""} ,
    type_operation:null,
  },
  updateCategory:null

};

const modalTransactionSlice = createSlice({
  name: "modalTransaction",
  initialState,
  reducers: {
    isModalInput(state) {
      state.modalInput = true;
    },
    closeModalInput(state) {
      state.modalInput = false;
      state.updateCategory = null
      state.isUpdate = false
    },
    setIsUpdate(state) {
      state.isUpdate = true;
    },
    isModalCategory(state) {
      state.modalCategory = true;
    },
    closeModalCategory(state) {
      state.modalCategory = false;
    },
    setIsModalForgotPassword(state) {
      state.modalForgotPassword = true;
    },
    closeModalForgotPassword(state) {
      state.modalForgotPassword = false;
    },
    setModalChangePassword(state){
      state.modalChangePassword = true;
    },
    closeModalChangePassword(state){
      state.modalChangePassword = false
    },
    setModalSignUp(state){
      state.modalSignUp = true
    },
    closeModalSignUp(state){
      state.modalSignUp = false
    },
    setDescriptionTransaction(state,action:PayloadAction<string>){
        state.transactionParametrs.description = action.payload
    },
    setDateTransaction(state,action:PayloadAction<string>){
    state.transactionParametrs.date = action.payload;
    },
    setCategoryTransaction(state,action:PayloadAction<ISelectCategory>){
        state.transactionParametrs.category = action.payload;
    },
    updateCategoryTransaction(state,action:PayloadAction<number | null>){
        state.updateCategory = action.payload;
    },
    setPriceTransaction(state,action:PayloadAction<number>){
        state.transactionParametrs.price= action.payload;
    },
    setUpdateParametrs(state,action:PayloadAction<ITransactionParametrs>){
        state.transactionParametrs = action.payload;
    },
    rateTransaction(state) {
        state.typeTransaction = { id: 1, name: "rate" };
    },
    incomeTransaction(state) {
        state.typeTransaction = { id: 2, name: "income" };
    },
    generalTransaction(state) {
      state.typeTransaction = { id: 3, name: "general" };
    },
    resetCategory(state){
      state.transactionParametrs.category = {id:null,name:"",icon:""}
    },
    resetUpdate(state){
        state.transactionParametrs = {
        transaction_id: null,
        description: "",
        price: null,
        date: "",
        category: {id:null,name:"",icon:""},
        type_operation:null,
        }
        state.updateCategory = null
        state.isUpdate = false
    },
  },
});
export const {
  isModalInput,
  closeModalInput,
  isModalCategory,
  setIsModalForgotPassword,
  closeModalForgotPassword,
  setModalChangePassword,
  closeModalChangePassword,
  setModalSignUp,
  closeModalSignUp,
  setIsUpdate,
  resetUpdate,
  resetCategory,
  setDescriptionTransaction,
  setPriceTransaction,
  setDateTransaction,
  setCategoryTransaction,
  setUpdateParametrs,
  closeModalCategory,
  rateTransaction,
  incomeTransaction,
  generalTransaction,
  updateCategoryTransaction,
} = modalTransactionSlice.actions;
export default modalTransactionSlice.reducer;
