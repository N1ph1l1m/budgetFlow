import styles from "../../../App/Styles/TransactionButtons.module.css"
import { FcBearish,FcBullish } from "react-icons/fc";

interface ITransactionButton {
  typeTransaction:string,
  onClick:React.MouseEventHandler<HTMLButtonElement>,
}

export const RateButton = ({typeTransaction,onClick}:ITransactionButton)=>{
    return(<button
                className={`${styles.typeTransactButton} ${
                  typeTransaction === "rate" ? styles.rateTransaction : ""
                } `}
                onClick={onClick}
              >
              <span >  <FcBearish /></span> Расходы
              </button>)
}

export const IncomeButton = ({typeTransaction,onClick}:ITransactionButton)=>{
    return (   <button
                className={`${styles.typeTransactButton} ${
                  typeTransaction === "income" ? styles.incomeTransaction : ""
                }`}
                onClick={onClick}
              >
               <span><FcBullish/></span> Доходы
              </button>)

}
