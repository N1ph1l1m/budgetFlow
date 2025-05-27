import { IoIosArrowDown } from "react-icons/io";
import styles from "../../app/styles/ListTransactions.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ISelectCategory,
  isModalInput,
  setDateTransaction,
  setPriceTransaction,
  setSelectCategory,
  setTransactionName,
  setIsUpdate,
  setTransactionId,
} from "../../store/Slice/modalTransaction/modalTransactionSlice";
import { RootState } from "../../store";
import { capitalizeFirstLetter } from "../../entities/listTransactions";
import { ITransactionData } from "../../store/Slice/transactionsSlice/transactionsSlice";
import { MdDelete } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import React from "react";
import { formatDate } from "../../entities/formarDateToServer";
interface ListTransactionsProps {
  list: Record<string, ITransactionData[]>;
  deleteItem: (id: number) => void;
}
interface IUpdateTransaction {
  id: number;
  nameTransaction: string;
  priceTransaction: number;
  dateTransaction: string;
  category: ISelectCategory[];
}

const ListTransactions: React.FC<ListTransactionsProps> = ({
  list,
  deleteItem,
}) => {
  const dispatch = useDispatch();
  const { typeTransaction, modalInput } = useSelector(
    (state: RootState) => state.modalTransactionSlice
  );
  const { current } = useSelector(
    (state: RootState) => state.transactionsSlice
  );

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );
  const [activeMenuItemId, setActiveMenuItemId] = useState<number | null>(null);

  useEffect(() => {
    setOpenCategories({});
  }, [list]);

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const TransactionPlaceholder = () => {
    return (
      <>
        <div className={styles.transactionPlaceholderWrap}>
          <span>Нет операций за текущий период</span>
          <span
            style={{
              color: typeTransaction.name == "rate" ? "red" : "green",
            }}
            className={styles.addTransaction}
            onClick={() => dispatch(isModalInput())}
          >
            {" "}
            Добавьте {typeTransaction.name == "rate" ? "расходы" : "доходы"}
          </span>
        </div>
      </>
    );
  };

  function sumPriceOperation(category: string): number {
    const items = list[category] || [];
    return items.reduce((total, item) => total + Number(item.price), 0);
  }

  if (
    !list ||
    typeof list !== "object" ||
    (Object.keys(list).length === 0 && typeTransaction.name !== "general")
  ) {
    return <TransactionPlaceholder />;
  }
  function checkCategoryIcon(items: ITransactionData[]) {
    if (items.length !== 0) {
      return items[0]?.category.icon;
    }
  }

  function handlerIsMenuRedactor(id: number) {
    setActiveMenuItemId((prevId) => (prevId === id ? null : id));
  }
  function updateTransactions({
    id,
    nameTransaction,
    priceTransaction,
    dateTransaction,
    category,
  }: IUpdateTransaction) {
    dispatch(setTransactionId(id));
    dispatch(isModalInput());
    dispatch(setIsUpdate());
    dispatch(setTransactionName(nameTransaction));
    dispatch(setPriceTransaction(priceTransaction));
    dispatch(setDateTransaction(formatDate(dateTransaction)));
    dispatch(setSelectCategory(category));
  }

  const MenuRedactor = ({
    id,
    nameTransaction,
    priceTransaction,
    dateTransaction,
    category,
  }: IUpdateTransaction) => {
    return (
      <ul className={styles.menuRedactor}>
        <li
          onClick={() =>
            updateTransactions({
              id,
              nameTransaction,
              priceTransaction,
              dateTransaction,
              category,
            })
          }
        >
          {" "}
          <GoPencil size={10} color="black" />
          <span>Редактировать</span>
        </li>
        <li onClick={() => deleteItem(id)}>
          <MdDelete size={10} color="red" />
          <span>Удалить</span>{" "}
        </li>
      </ul>
    );
  };
  return (
    <>
      {Object.entries(list).map(([category, items]) => (
        <div className={styles.listWrap} key={category}>
          <div className={styles.headerList}>
            <div className={styles.wrapIconTitle}>
              <img
                className={styles.iconCategory}
                src={checkCategoryIcon(items)}
                alt={`${category}icon`}
              />
              <span className={styles.titleList}>
                {capitalizeFirstLetter(category)}
              </span>
            </div>

            <div className={styles.listMenu}>
              <span className={styles.listPrice}>
                {sumPriceOperation(category)} {current}
              </span>

              <span
                className={styles.listIcon}
                onClick={() => toggleCategory(category)}
              >
                <IoIosArrowDown size="20" />
              </span>
            </div>
          </div>
          {
            <ul>
              {openCategories[category] &&
                items.map((item) => (
                  <li className={styles.listItems} key={item.id}>
                    <span>{capitalizeFirstLetter(item.description)}</span>{" "}
                    <div className={styles.wrapPriceRedactor}>
                      <span>
                        {item.price} {current}
                      </span>
                      <button
                        className={styles.menuRedactorButton}
                        onClick={() => handlerIsMenuRedactor(item.id)}
                      >
                        ...
                      </button>
                      {activeMenuItemId === item.id && (
                        <MenuRedactor
                          id={item.id}
                          nameTransaction={item.description}
                          priceTransaction={item.price}
                          dateTransaction={item.date}
                          category={[item.category]}
                        />
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          }
        </div>
      ))}
    </>
  );
};

export default ListTransactions;
