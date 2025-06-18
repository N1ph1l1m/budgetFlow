
import styles from "../../app/styles/ListTransactions.module.css"
import { useDispatch } from "react-redux";
import { isModalInput } from "../../store/Slice/modalTransaction/modalTransactionSlice";

 const TransactionPlaceholder = () => {
const dispatch = useDispatch()
    return (
      <>
        <div className={styles.transactionPlaceholderWrap}>
          <span>Нет операций за текущий период</span>
          <span  className={styles.titleInput}
            onClick={() => dispatch(isModalInput())}
          >
            Добавьте транзакции
          </span>
        </div>
      </>
    );
  };

  export default TransactionPlaceholder;
