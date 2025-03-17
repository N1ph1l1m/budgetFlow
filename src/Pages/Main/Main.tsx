import styles from "../../App/Styles/Main.module.css"
import { CateroryTransaction } from "../../App/Data/Data"
import { InputItem } from "../../Shared/InputItem/InputItem"
import { useState } from "react"
export const Main = () =>{
    const [transaction, setTransaction] = useState("")

    const renderTransaction = ()=>{
        switch (transaction){
            case "rate":
                return <InputItem title="Расходы" typeItem="rate" categories={CateroryTransaction.rate}/>
            break;
            case "income":
                return <InputItem title="Доходы" typeItem="income" categories={CateroryTransaction.income} />
            break;
        }
    }
    return(
        <>


        <div className={styles.mainWrap}>
        <ul className={styles.transactionListWrap}>
            <li className={styles.transactionListItem}>Расходы:<span className={styles.balanceTitle}>100</span></li>
            <li className={styles.transactionListItem}>Доходы:<span className={styles.balanceTitle}>20004</span></li>
            <li className={styles.transactionListItem}>Баланс:<span className={styles.balanceTitle}>55434</span></li>
        </ul>
        <button className={`${styles.buttonTransaction} ${styles.rate}`} onClick={()=>setTransaction("rate")}> Добавить расходы</button>
        <button className={`${styles.buttonTransaction} ${styles.income}`} onClick={()=>setTransaction("income")}> Добавить доходы</button>
        {renderTransaction()}

        </div>
        </>
    )
}
