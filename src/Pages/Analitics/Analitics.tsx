import styles from "../../App/Styles/Analitics.module.css";
import styless from "../../App/Styles/InputTransaction.module.css";
import { useState, useEffect, ChangeEvent } from "react";
import { CateroryTransaction } from "../../App/Data/Data";
import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";
interface ICategory {
  id: number;
  key: string;
  name: string;
}

export const Analitics = () => {
  const [transaction, setTransaction] = useState("rate");
  const [categories, setCategories] = useState("food");
  const dispatch = useDispatch();

//   const { transactionState } = useSelector(
//     (state: RootState) => state.transactionsSlice
//   );

//   function sumPriceOperation(typeOperation: string): number {
//     return transactionState
//       .filter((price) => price.typeOperation === typeOperation)
//       .reduce((total, item) => total + Number(item.price), 0);
//   }

  const renderTable = () => {
    if(transaction.length !== 0 && categories.length !==0 ){
        return(
            <div className={styles.tableBorder}>
            <table className={styles.tableWrap}>
              <thead>
                <tr  >
                  <th colSpan={2}>Расходы</th>

                </tr>
              </thead>
              <tbody>
                {
                  <tr key={1}>
                    <td>category</td>
                    <td
                      style={{
                        textAlign: "right",
                        borderRight: "1px solid black",
                      }}
                    >
                      price
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        )
    }

  };
  function handlerTransaction(e: ChangeEvent<HTMLSelectElement>) {
    setTransaction(e.target.value);
  }
  function handlerCategory(e: ChangeEvent<HTMLSelectElement>) {
    setCategories(e.target.value);
  }

  return (
    <>
      <div className={styles.analiticWrap}>
        <header className={styles.headerWrap}>
          <h2 className={styles.titleHeader}>
            {" "}
            Выберите тип транзакции и категорию
          </h2>
          <div className={styles.selectWrap}>
            <div className={styless.inputWrap}>
              <label htmlFor="category">
                <span className={styless.inputTitle}>Транзакция</span>
              </label>

              <select
                className={styless.inputItem}
                onChange={(e) => handlerTransaction(e)}
                name="category"
              >
                <option value=""></option>
                <option value={"rate"}>Расход</option>
                <option value={"income"}>Доход</option>
              </select>
            </div>

            <div className={styless.inputWrap}>
              <label htmlFor="category">
                <span className={styless.inputTitle}>Категории</span>
              </label>

              <select
                className={styless.inputItem}
                onChange={(e) => handlerCategory(e)}
                name="category"
              >
                <option value=""></option>
                {CateroryTransaction.rate.map((category: ICategory) => (
                  <option key={category.id} value={category.key}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>
                <div className={styles.tableWrap}>
                {renderTable()}
                </div>


      </div>
    </>
  );
};
