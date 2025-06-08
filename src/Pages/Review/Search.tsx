import { ChangeEvent, useEffect, useState } from "react";
import styles from "../../app/styles/Search.module.css";
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";

import { fetchTransactions } from "../../entities/crud/getTransactions";
import { deleteItem } from "../../entities/crud/deleteTransaction";
import { MenuRedactor } from "../../shared/MenuRedactor/MenuRedactor";
import { ITransactionData } from "../../store/Slice/transactionsSlice/transactionsSlice";
import { useTranslation } from "react-i18next";
const Search = () => {
  const dispatch = useDispatch();
  const { isLoaded, categoryList } = useSelector(
    (state: RootState) => state.transactionsSlice
  );

  useEffect(() => {
    fetchTransactions({ isLoaded, categoryList, dispatch });
  }, [isLoaded, categoryList, dispatch]);

  const [activeMenuItemId, setActiveMenuItemId] = useState<number | null>(null);
  const [transactionName, setTransactionName] = useState("");
  const [resultList, setResultList] = useState<ITransactionData[]>([]);
  const { transactionState, current } = useSelector(
    (state: RootState) => state.transactionsSlice
  );
  const { t, i18n } = useTranslation();

  function findTransactions() {
    if (transactionName.length >= 2) {
      const result = transactionState?.filter((item) =>
        item.description
          .toLocaleLowerCase()
          .includes(transactionName.toLocaleLowerCase())
      );
      setResultList(result);
    } else {
      setResultList([]);
    }
  }
  const option: object = { month: "long", day: "numeric", year: "numeric" };

  function transformDate(date: string) {
    const transform = new Date(date);
    return transform.toLocaleDateString(
      i18n.language == "ru" ? "ru-RU" : "en-EN",
      option
    );
  }

  function handlerIsMenuRedactor(id: number) {
    setActiveMenuItemId((prevId) => (prevId === id ? null : id));
  }
  function deleteTransaction(id: number) {
    deleteItem(id, dispatch);
  }

  const renderList = () => {
    if (resultList.length === 0) return null;
    return (
      <div className={styles.wrapList}>
        {resultList.map((item) => (
          <ul className={styles.resultWrap}>
            <img src={item.category.icon} alt={`item-img${item.id}`} />
            <li className={styles.resultItem}>{item.description}</li>
            <li className={styles.resultItem}>{transformDate(item.date)}</li>
            <li
              className={styles.resultItem}
              style={{
                color:
                  item.category.type_transaction.name == "rate"
                    ? "rgb(187, 33, 33)"
                    : "rgb(0, 143, 55)",
              }}
            >
              {`${item.category.type_transaction.name == "rate" ? "-" : "+"} ${
                item.price
              }  ${current}`}{" "}
            </li>
            <li className={`${styles.resultItem} ${styles.wrapButtonMenu}`}>
              <button
                className={styles.menuRedactorButton}
                onClick={() => handlerIsMenuRedactor(item.id)}
                style={{ color: activeMenuItemId === item.id ? "red" : "" }}
              >
                ...
              </button>
              {activeMenuItemId === item.id && (
                <MenuRedactor
                  className={styles.newPosition}
                  transactionParam={{
                    transaction_id: item.id,
                    description: item.description,
                    price: item.price,
                    date: item.date,
                    category: item.category,
                    type_operation: item.category.type_transaction.id,
                  }}
                  deleteItem={() => deleteTransaction(item.id)}
                />
              )}
            </li>
          </ul>
        ))}
      </div>
    );
  };

  function handlerInput(e: ChangeEvent<HTMLInputElement>) {
    setTransactionName(e.target.value);
  }

  useEffect(() => {
    findTransactions();
  }, [transactionName, transactionState]);

  return (
    <div className={styles.searchWrap}>
      <h1>{t("searchTittle")}</h1>
      <input
        className={styles.searchInput}
        onChange={(e) => handlerInput(e)}
        value={transactionName}
        placeholder={`${t("searchPlaceHolder")}`}
      />
      {renderList()}
    </div>
  );
};

export default Search;
