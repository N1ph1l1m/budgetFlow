import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TypeTransaction {
  id: number;
  name: string;
}

export interface ISelectCategory {
  id: number;
  name: string;
  icon: string;
}
interface IModalTransaction {
  modalInput: boolean;
  transaction_id: number | null;
  transactionName: string;
  price: number | null;
  dateTransaction: string;
  modalCategory: boolean;
  isUpdate: boolean;
  typeTransaction: TypeTransaction;
  selectCategory: ISelectCategory[];
}

const initialState: IModalTransaction = {
  modalInput: false,
  transaction_id: null,
  transactionName: "",
  price: null,
  dateTransaction: "",
  modalCategory: false,
  isUpdate: false,
  typeTransaction: { id: 1, name: "rate" },
  selectCategory: [],
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
    },
    setIsUpdate(state) {
      state.isUpdate = true;
    },
    resetUpdate(state) {
      state.isUpdate = false;
    },
    setTransactionId(state, action: PayloadAction<number>) {
      state.transaction_id = action.payload;
    },
    setTransactionName(state, action: PayloadAction<string>) {
      state.transactionName = action.payload;
    },
    setPriceTransaction(state, action: PayloadAction<number | null>) {
      state.price = action.payload;
    },
    setDateTransaction(state, action: PayloadAction<string>) {
      state.dateTransaction = action.payload;
    },
    isModalCategory(state) {
      state.modalCategory = true;
    },
    closeModalCategory(state) {
      state.modalCategory = false;
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
    setSelectCategory(state, action: PayloadAction<ISelectCategory[]>) {
      state.selectCategory = action.payload;
    },
    resetCategory(state) {
      state.selectCategory = [];
    },
  },
});
export const {
  isModalInput,
  closeModalInput,
  isModalCategory,
  setIsUpdate,
  resetUpdate,
  setTransactionName,
  setTransactionId,
  setPriceTransaction,
  setDateTransaction,
  closeModalCategory,
  rateTransaction,
  incomeTransaction,
  setSelectCategory,
  resetCategory,
  generalTransaction,
} = modalTransactionSlice.actions;
export default modalTransactionSlice.reducer;
