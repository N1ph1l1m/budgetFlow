import styles from "../../app/styles/TransactionButtons.module.css"
import { FcBearish,FcBullish ,FcBarChart} from "react-icons/fc";
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../../store";
import { rateTransaction,incomeTransaction, generalTransaction } from "../../store/Slice/modalTransaction/modalTransactionSlice";
interface IButtonTransaction{
  total?:number | null,
  large?:boolean,
}

export const RateButton = ({total,large}:IButtonTransaction)=>{
  const {typeTransaction} = useSelector((state:RootState)=>state.modalTransactionSlice)
  const dispatch = useDispatch();

    return(<>
          <button
                className={
                  `${styles.typeTransactButton}
                   ${large  ? styles.largeSize : ""}
                   ${typeTransaction.name  === "rate" ? styles.rateTransaction : ""}`
                  }
                onClick={()=>dispatch(rateTransaction())}
              >
              <span >  <FcBearish /> </span> Расходы  {total && <span className={styles.totalValue} >{total} &#8381;</span> }
              </button>

              </>
              )
}

export const IncomeButton = ({total , large}:IButtonTransaction) =>{
  const {typeTransaction} = useSelector((state:RootState)=>state.modalTransactionSlice)
  const dispatch = useDispatch();
    return (   <button
                className={
                `${styles.typeTransactButton}
                 ${large  ? styles.largeSize : ""}
                 ${typeTransaction.name === "income" ? styles.incomeTransaction : "" }`
                }
                onClick={()=>dispatch(incomeTransaction())}
              >
               <span><FcBullish/></span> Доходы  {total && <span className={styles.totalValue} >{total} &#8381;</span> }
              </button>)}

export const  GeneralButton = ({large}:IButtonTransaction)=>{
    const {typeTransaction} = useSelector((state:RootState)=>state.modalTransactionSlice)
    const dispatch = useDispatch();
  return(<button
  className={
                `${styles.typeTransactButton}
                 ${large  ? styles.largeSize : ""}
                ${typeTransaction.name  === "general" ? styles.generalTransaction : "" }
                 `
                }
     onClick={()=>dispatch(generalTransaction())}
  >
    <span ><FcBarChart/></span> Общая
  </button>)
}
