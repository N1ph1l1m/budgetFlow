import styles from "../../App/Styles/Analitics.module.css";
import styless from "../../App/Styles/InputTransaction.module.css";
import { useState, useEffect, ChangeEvent } from "react";
import { CateroryTransaction } from "../../App/Data/Data";
import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteTransaction } from "../../Store/Slice/transactionsSlice/transactionsSlice";
interface ICategory {
  id: number;
  key: string;
  name: string;
}

export const Analitics = () => {
  const [transaction, setTransaction] = useState("");
  const [categories, setCategories] = useState("");
  const [isTrash, setTrash] = useState(false);
  const [indexItem, setIndexItem] = useState(0);
  const dispatch = useDispatch();

  const transactionState = useSelector(
    (state: RootState) => state.transactionsSlice.transactionState
  );

  const filterCategory = transactionState.filter(
    (item) => item.category === categories && item.typeOperation === transaction
  );
  function sumPriceOperation(): number {
    return filterCategory.reduce(
      (total, item) => total + Number(item.price),
      0
    );
  }

  // useEffect(()=>{
  //   console.log(isTrash);
  // },[isTrash])

  const renderTable = () => {
    if (
      transaction.length !== 0 &&
      categories.length !== 0 &&
      filterCategory.length !== 0
    ) {
      return (
        <div className={styles.tableAnaliticBorder}>
          <table className={styles.tableAnaliticWrap}>
            <thead>
              <tr>
                <th colSpan={2}>Расходы</th>
              </tr>
            </thead>
            <tbody>
              {filterCategory.map((item, index) => (
                <tr
                  key={index}
                  onMouseLeave={() => {
                    setTrash(false);
                    setIndexItem(0);
                  }}
                  onClick={() => {
                    setTrash(true);
                    setIndexItem(item.id);
                  }}
                  onMouseEnter={() => {
                    setTrash(true);
                    setIndexItem(item.id);
                  }}
                >
                  <td>{item.itemName}</td>
                  <td className={styles.priceWrap}>
                    <FaRegTrashAlt
                      onClick={() => dispatch(deleteTransaction(item.id))}
                      style={{
                        display:
                          isTrash && indexItem === item.id
                            ? "inline-block"
                            : "none",
                      }}
                      className={styles.trashIcon}
                      size={"14"}
                      color="#ffffff"
                    />
                    {item.price}
                  </td>
                </tr>
              ))}
              <tr>
                <td key={"id-total"}>Итого:</td>
                <td
                  style={{
                    textAlign: "right",
                  }}
                >
                  {sumPriceOperation()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className={styles.tableAnaliticBorder}>
          <p className={styles.titleHeader} style={{ marginTop: "20px" }}>
            Данные отсуствуют
          </p>
        </div>
      );
    }
  };
  function handlerTransaction(e: ChangeEvent<HTMLSelectElement>) {
    setTransaction(e.target.value);
  }
  function handlerCategory(e: ChangeEvent<HTMLSelectElement>) {
    setCategories(e.target.value);
  }
  const renderOptionCategory = () => {
    // if(transaction.length === 0  ) return

    switch (transaction) {
      case "rate":
        return (
          <>
            {CateroryTransaction.rate.map((category: ICategory) => (
              <option key={category.id} value={category.key}>
                {category.name}
              </option>
            ))}
          </>
        );
        break;
      case "income":
        return (
          <>
            {CateroryTransaction.income.map((category: ICategory) => (
              <option key={category.id} value={category.key}>
                {category.name}
              </option>
            ))}
          </>
        );

        break;
    }
  };

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
                {renderOptionCategory()}
              </select>
            </div>
          </div>
        </header>
        <div className={styles.tableWrap}>{renderTable()}</div>
      </div>
    </>
  );
};
