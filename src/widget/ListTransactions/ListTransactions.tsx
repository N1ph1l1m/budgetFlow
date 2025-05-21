import { IoIosArrowDown } from "react-icons/io";
import styles from "../../app/styles/ListTransactions.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isModalInput } from "../../store/Slice/modalTransaction/modalTransactionSlice";
import { RootState } from "../../store";
import { capitalizeFirstLetter } from "../../entities/listTransactions";
import { ITransactionData } from "../../store/Slice/transactionsSlice/transactionsSlice";
interface ListTransactionsProps {
  list: Record<string, ITransactionData[]>;
}


const ListTransactions:React.FC<ListTransactionsProps> = ({ list}) => {
  const dispatch = useDispatch();
  const { typeTransaction } = useSelector(
    (state: RootState) => state.modalTransactionSlice
  );


  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

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
              color: typeTransaction[0].name == "rate" ? "red" : "green",
            }}
            className={styles.addTransaction}
            onClick={() => dispatch(isModalInput())}
          >
            {" "}
            Добавьте {typeTransaction[0].name == "rate" ? "расходы" : "доходы"}
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
    (Object.keys(list).length === 0 && typeTransaction[0].name !== "general")
  ) {
    return <TransactionPlaceholder />;
  }
  function checkCategoryIcon(items:ITransactionData[]):string{
    return items[0].category.icon;
  }
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
                {sumPriceOperation(category)} &#8381;
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
                    <span> {item.price} &#8381;</span>
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
