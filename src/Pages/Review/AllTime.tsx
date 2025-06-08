import { useSelector, useDispatch } from "react-redux";
import styles from "../../app/styles/AllTime.module.css";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { ITransactionData } from "../../store/Slice/transactionsSlice/transactionsSlice";
import BarChartComponent from "../../shared/Charts/BarChart";
import { fetchTransactions } from "../../entities/crud/getTransactions";
import TransactionPlaceholder from "../../shared/TransactionPlaceholder/TransactionPlaceholder";
import { capitalizeFirstLetter } from "../../entities/listTransactions";
import { MdCalendarMonth } from "react-icons/md";
import { useTranslation } from "react-i18next";

const AllTime = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { isLoaded, categoryList, transactionState, current } = useSelector(
    (state: RootState) => state.transactionsSlice
  );
  const [sumOperations, setSumOperations] = useState<SumOperation[]>([]);
  const [listMonth, setListMonth] = useState<
    Record<string, ITransactionData[]>
  >({});
  type SumOperation = { name: string; rate: number; income: number };

  useEffect(() => {
    fetchTransactions({ isLoaded, categoryList, dispatch });
    changeNamesBar();
  }, [isLoaded, categoryList, dispatch]);

  useEffect(() => {
    setSumOperations(sumPriceOperation());
  }, [listMonth]);
  useEffect(() => {
    changeNamesBar();
    setListMonth(groupToMonth());
  }, [transactionState]);

  const changeNamesBar = () => {
    const span = document.getElementsByClassName("recharts-legend-item-text");
    if (span.length > 0) {
      const rateSpan = span[0] as HTMLElement;
      rateSpan.textContent = `${t("rate")}`;
      const incomeSpan = span[1] as HTMLElement;
      incomeSpan.textContent = `${t("income")}`;
    }
  };

  function groupToMonth() {
    const allTransactions = transactionState.flat();

    const monthMap = allTransactions.reduce(
      (
        acc: Record<
          string,
          { monthIndex: number; items: typeof allTransactions }
        >,
        item
      ) => {
        const date = new Date(item.date);
        const monthName = date.toLocaleDateString(
          i18n.language == "ru" ? "ru-RU" : "en-EN",
          { month: "long" }
        );
        const monthIndex = date.getMonth();

        if (!acc[monthName]) {
          acc[monthName] = {
            monthIndex,
            items: [],
          };
        }

        acc[monthName].items.push(item);
        return acc;
      },
      {}
    );

    const sorted = Object.entries(monthMap)
      .sort((a, b) => a[1].monthIndex - b[1].monthIndex)
      .reduce((acc, [monthName, data]) => {
        acc[monthName] = data.items;
        return acc;
      }, {} as Record<string, typeof allTransactions>);

    return sorted;
  }
  function sumPriceOperation() {
    const result: Record<
      string,
      { name: string; rate: number; income: number }
    > = {};

    for (const i in listMonth) {
      const filterRate = listMonth[i].filter(
        (item) => item.category.type_transaction.name === "rate"
      );
      const filterIncome = listMonth[i].filter(
        (item) => item.category.type_transaction.name === "income"
      );

      filterRate.forEach((item) => {
        const month = new Date(item.date).toLocaleDateString(
          i18n.language == "ru" ? "ru-RU" : "en-EN",
          {
            month: "long",
          }
        );
        if (!result[month]) {
          result[month] = { name: month, rate: 0, income: 0 };
        }
        result[month].rate += Number(item.price);
      });

      filterIncome.forEach((item) => {
        const month = new Date(item.date).toLocaleDateString(
          i18n.language == "ru" ? "ru-RU" : "en-EN",
          {
            month: "long",
          }
        );
        if (!result[month]) {
          result[month] = { name: month, rate: 0, income: 0 };
        }
        result[month].income += Number(item.price);
      });
    }

    return Object.values(result);
  }

  const listAllTransaction = () => {
    return (
      <>
        <div className={styles.listMonthWrap}>
          {sumOperations.map((item) => (
            <ul className={styles.listMonth} key={item.name}>
              <li className={styles.listTitle}>
                <span>
                  <MdCalendarMonth size={16} />
                </span>{" "}
                {capitalizeFirstLetter(item.name)}
              </li>
              <li>
                {" "}
                <span style={{ color: "red" }}>{t("rate")}:</span> {item.rate}
                {current}
              </li>
              <li>
                <span style={{ color: "green" }}>{t("income")} :</span>
                {item.income}
                {current}
              </li>
            </ul>
          ))}
        </div>
      </>
    );
  };

  return sumOperations.length === 0 ? (
    <TransactionPlaceholder />
  ) : (
    <div className={styles.wrapAllTime}>
      <BarChartComponent data={sumOperations} width={750} />

      {listAllTransaction()}
    </div>
  );
};

export default AllTime;
