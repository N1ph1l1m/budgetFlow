import styles from "../../App/Styles/Main.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosArrowDown,
} from "react-icons/io";
import {
  RateButton,
  IncomeButton,
} from "../../shared/InputTransaction/TransactionButtons/TransactionButtons";

interface IFilteredTransaction{
  updatedDay : Date | number,
  updatedMonth :number,
  transaction:number | string,
}
export const MainPage = () => {

  const transactionState = useSelector(
    (state: RootState) => state.transactionsSlice.transactionState
  );
  const { typeTransaction} = useSelector((state:RootState)=>state.modalTransactionSlice)
  const [date, setDate] = useState(new Date());
  const [list, setList] = useState({});
  const [openCategories, setOpenCategories] = useState({});
  const [sumRate,setSumRate] = useState<number>(0);
  const [sumIncome,setSumIncome] = useState<number>(0);

  useEffect(() => {
    console.log( filterTransition(date));
 ;
  }, [typeTransaction, date]);

  function changeDay(type: string) {
    const newDate = new Date(date);
    if (type === "+") {
      newDate.setUTCDate(date.getUTCDate() + 1);
    } else if (type === "-") {
      newDate.setUTCDate(date.getUTCDate() - 1);
    }
    setDate(newDate);
  }


  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  function sumTransaction(filtered):number{
  return filtered.reduce((acc, item) => acc + item.price, 0);
  }

  function groupByTranssaction(filteredList):object{
    return  filteredList.reduce((acc:Record<string, typeof product[]>, product) => {
      const category:string = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, typeof filteredList[0][]>);
  }

  function filteredTransaction({updatedDay,updatedMonth,transaction}:IFilteredTransaction){
   return  transactionState?.filter((item) => {
      const itemDate = new Date(item.date);
      const itemDay = itemDate.getUTCDate();
      const itemMonth = itemDate.getUTCMonth() + 1;

      return (
        itemDay === updatedDay &&
        itemMonth === updatedMonth &&
        item.typeOperation === transaction
      );
    });
  }


  function filterTransition(data: Date) {
    const newDate = new Date(data);
    const updatedDay = newDate.getUTCDate();
    const updatedMonth = newDate.getUTCMonth() + 1;

    const filteredList = filteredTransaction({updatedDay, updatedMonth, transaction:typeTransaction})
    const filteredRate = filteredTransaction({updatedDay,updatedMonth,transaction:"rate"})
    const filteredIncome = filteredTransaction({updatedDay,updatedMonth,transaction:"income"})

    setList(groupByTranssaction(filteredList));
    setSumRate(sumTransaction(filteredRate))
    setSumIncome(sumTransaction(filteredIncome))
  }



  function sumPriceOperation(category: string): number {
    const items = list[category] || [];
    return items.reduce((total, item) => total + Number(item.price), 0);
  }

  const option: object = { month: "long", day: "numeric" };

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  return (
    <>
      <div className={styles.mainWrap}>
        <header className={styles.headerWrap}>
          <span className={styles.headerNav} onClick={() => changeDay("-")}>
            <IoIosArrowBack color="black" size="20" />
          </span>
          <h1 className={styles.headerTitle}>
            {date.toLocaleDateString("ru-RU", option)}
          </h1>
          <span className={styles.headerNav} onClick={() => changeDay("+")}>
            <IoIosArrowForward color="black" size="20" />
          </span>
        </header>

        <div className={styles.buttonsWrap}>
          <RateButton  total={sumRate} large/>
          <IncomeButton total = {sumIncome} large/>
        </div>

        {Object.entries(list).map(([category, items]) => (
          <div className={styles.listWrap} key={category}>
            <div className={styles.headerList}>
              <span className={styles.titleList}>
                {capitalizeFirstLetter(category)}{" "}
              </span>
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
                      <span> {capitalizeFirstLetter(item.itemName)} </span>{" "}
                      <span> {item.price} &#8381;</span>
                    </li>
                  ))}
              </ul>
            }
          </div>
        ))}
      </div>
    </>
  );
};
