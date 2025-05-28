import { IoIosArrowDown } from "react-icons/io";
import styles from "../../app/styles/ListTransactions.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  isModalInput,
  setIsUpdate,
  setUpdateParametrs,
  ITransactionParametrs,
} from "../../store/Slice/modalTransaction/modalTransactionSlice";
import { RootState } from "../../store";
import { capitalizeFirstLetter } from "../../entities/listTransactions";
import { ITransactionData } from "../../store/Slice/transactionsSlice/transactionsSlice";
import { MdDelete } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import React from "react";

interface ListTransactionsProps {
  list: Record<string, ITransactionData[]>;
  deleteItem: (id: number) => void | Promise<void>;
}

const ListTransactions: React.FC<ListTransactionsProps> = ({
  list,
  deleteItem,
}) => {
  const dispatch = useDispatch();
  const { typeTransaction } = useSelector(
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
    transaction_id,
    description,
    price,
    date,
    category,
    type_operation,
  }: ITransactionParametrs) {
    dispatch(isModalInput());
    dispatch(setIsUpdate());
    dispatch(setUpdateParametrs({
      transaction_id,
      description,
      price,
      date,
      category,
      type_operation}))


  }

  const MenuRedactor = ({
    transaction_id,
    description,
    price,
    date,
    category,
    type_operation
  }: ITransactionParametrs) => {

    return (
      <ul className={styles.menuRedactor}>
        <li
          onClick={() =>
            updateTransactions({
            transaction_id,
            description,
            price,
            date,
            category,
            type_operation
            })
          }
        >
          {" "}
          <GoPencil size={10} color="black" />
          <span>Редактировать</span>
        </li>
       {transaction_id &&  <li  onClick={() => deleteItem(transaction_id)}>
          <MdDelete size={10} color="red" />
          <span>Удалить</span>{" "}
        </li>}
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
                          transaction_id={item.id}
                          description={item.description}
                          price={item.price}
                          date={item.date}
                          category={item.category}
                          type_operation={item.category.type_transaction.id}
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
