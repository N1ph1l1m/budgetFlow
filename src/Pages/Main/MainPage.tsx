import styles from "../../App/Styles/Main.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { useEffect, useState } from "react";
export const MainPage = () => {
  const transactionState = useSelector(
    (state: RootState) => state.transactionsSlice.transactionState
  );
  const [date, setDate] = useState(new Date());

  const [typeTransaction, setTypeTransaction] = useState("rate");
  const [list, setList] = useState([]);
  useEffect(() => {
    filterTransition(date);
  }, [typeTransaction, date]);

  function changeDay(type: string) {
    const newDate = new Date(date);
    if (type === "+") {
      newDate.setUTCDate(date.getUTCDate() + 1);
    } else if (type === "-") {
      newDate.setUTCDate(date.getUTCDate() - 1);
    }
    setDate(newDate);
    filterTransition(date);
  }

  function filterTransition(data: Date) {
    const newDate = new Date(data);
    const updatedDay = newDate.getUTCDate();
    const updatedMonth = newDate.getUTCMonth() + 1;

    const filtered = transactionState?.filter((item) => {
      const itemDate = new Date(item.date);
      const itemDay = itemDate.getUTCDate();
      const itemMonth = itemDate.getUTCMonth() + 1;

      return (
        itemDay === updatedDay &&
        itemMonth === updatedMonth &&
        item.typeOperation === typeTransaction
      );
    });

    const grouped = filtered.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});

    setList(grouped);
  }

  useEffect(() => {
    // for (const sort in list) {
    //   console.log(list[sort]);
    // }
  }, [list]);

  // function sumPriceOperation(typeOperation: string): number {
  //   return transactionState
  //     .filter((price) => price.typeOperation === typeOperation)
  //     .reduce((total, item) => total + Number(item.price), 0);
  // }

  const option: object = { month: "long", day: "numeric" };

  return (
    <>
      <div className={styles.mainWrap}>
        <div className={styles.tableBorder}>
          <h1>
            {" "}
            <span onClick={() => changeDay("-")} style={{ fontSize: "20px" }}>
              &#11164;
            </span>
            {date.toLocaleDateString("ru-RU", option)}{" "}
            <span onClick={() => changeDay("+")} style={{ fontSize: "20px" }}>
              &#11166;
            </span>
          </h1>
          <div
            style={{
              display: "flex",
              width: "400px",
              justifyContent: "space-around",
            }}
          >
            <h1>{typeTransaction}</h1>
            <button onClick={() => setTypeTransaction("rate")}>Расходы</button>
            <button onClick={() => setTypeTransaction("income")}>Доходы</button>
          </div>
          <ul>
            <ul>
              {Object.entries(list).map(([category, items]) => (
                <div key={category}>
                  <h3>{category}</h3>
                  <ul>
                    {items.map((item) => (
                      <li key={item.id}>
                        {item.itemName} — {item.price}₽
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
          </ul>
        </div>
      </div>
    </>
  );
};
