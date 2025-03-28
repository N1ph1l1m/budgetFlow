import styles from "../../App/Styles/Main.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
export const MainPage = () => {
  const transactionState = useSelector(
    (state: RootState) => state.transactionsSlice
  );

  function sumPriceOperation(typeOperation: string): number {
    return transactionState
      .filter((price) => price.typeOperation === typeOperation)
      .reduce((total, item) => total + Number(item.price), 0);
  }

  function sumPriceCetetory(typeOperation: string, category: string): number {
    return transactionState
      .filter(
        (price) =>
          price.typeOperation === typeOperation && price.category === category
      )
      .reduce((total, item) => total + Number(item.price), 0);
  }

  return (
    <>
      <div className={styles.mainWrap}>
        <div className={styles.tableBorder}>
          <table className={styles.tableWrap}>
            <caption>Учет доходов и расходов в марте</caption>
            <thead>
              <tr>
                <th>Расходы</th>
                <th
                  style={{ textAlign: "right", borderRight: "1px solid black" }}
                >{`${sumPriceOperation("rate")} ₽`}</th>

                <th>Доходы</th>
                <th style={{ textAlign: "right" }}>{`${sumPriceOperation(
                  "income"
                )} ₽`}</th>

              </tr>
            </thead>
            <tbody>
              {(() => {
                const uniqueCategories = (items: typeof transactionState) =>
                  Array.from(new Set(items.map((item) => item.category)));

                const expenseCategories = uniqueCategories(
                  transactionState.filter(
                    (item) => item.typeOperation === "rate"
                  )
                );
                const incomeCategories = uniqueCategories(
                  transactionState.filter(
                    (item) => item.typeOperation === "income"
                  )
                );
                const maxLength = Math.max(
                  expenseCategories.length,
                  incomeCategories.length
                );

                return Array.from({ length: maxLength }).map((_, index) => (
                  <tr key={index}>
                    <td>{expenseCategories[index] || ""}</td>
                    <td
                      style={{
                        textAlign: "right",
                        borderRight: "1px solid black",
                      }}
                    >
                      {expenseCategories[index]
                        ? sumPriceCetetory("rate", expenseCategories[index])
                        : ""}
                    </td>
                    <td>{incomeCategories[index] || ""}</td>
                    <td style={{ textAlign: "right" }}>
                      {incomeCategories[index]
                        ? sumPriceCetetory("income", incomeCategories[index])
                        : ""}
                    </td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
