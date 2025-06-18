import { configureStore } from "@reduxjs/toolkit"
import transactionsSlice from "./Slice/transactionsSlice/transactionsSlice"
import modalTransactionSlice from "./Slice/modalTransaction/modalTransactionSlice"
import usersSlice from "./Slice/usersSlice/usersSlice"
import notificationSlice from "./Slice/notificationSlice/notificationSlice"
export const store = configureStore({
    reducer:{
        transactionsSlice:transactionsSlice,
        modalTransactionSlice:modalTransactionSlice,
        usersSlice:usersSlice,
        notificationSlice:notificationSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;
export default store;
