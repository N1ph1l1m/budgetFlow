import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { ITransactionData } from "../../store/Slice/transactionsSlice/transactionsSlice";
import BarChartComponent from "../../shared/Charts/BarChart";
import { fetchTransactions } from "../../entities/API/getTransactions";

const AllTime = () => {
  const dispatch = useDispatch();
  const { isLoaded, categoryList } = useSelector(
    (state: RootState) => state.transactionsSlice
  );
  const [sumOperations, setSumOperations] = useState<SumOperation[]>([]);
  const [listMonth, setListMonth] = useState<
    Record<string, ITransactionData[]>
  >({});
  type SumOperation = { name: string; rate: number; income: number };

  useEffect(() => {
    fetchTransactions({ isLoaded, categoryList, dispatch });
  }, [isLoaded, categoryList, dispatch]);

  useEffect(() => {
    setSumOperations(sumPriceOperation());
  }, [listMonth]);

  const { transactionState } = useSelector(
    (state: RootState) => state.transactionsSlice
  );

  useEffect(() => {
    setListMonth(groupToMonth());
  }, [transactionState]);

  function groupToMonth() {
    const allTransactions = transactionState.flat();
    return allTransactions.reduce(
      (acc: Record<string, (typeof item)[]>, item) => {
        const option: object = { month: "long" };
        const dateMonth = new Date(item.date);

        const month = dateMonth.toLocaleDateString("ru-RU", option);
        if (!acc[month]) {
          acc[month] = [];
        }
        acc[month].push(item);
        return acc;
      },
      {}
    );
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
        const month = new Date(item.date).toLocaleDateString("ru-RU", {
          month: "long",
        });
        if (!result[month]) {
          result[month] = { name: month, rate: 0, income: 0 };
        }
        result[month].rate += Number(item.price);
      });

      filterIncome.forEach((item) => {
        const month = new Date(item.date).toLocaleDateString("ru-RU", {
          month: "long",
        });
        if (!result[month]) {
          result[month] = { name: month, rate: 0, income: 0 };
        }
        result[month].income += Number(item.price);
      });
    }

    return Object.values(result);
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100px%",
        height: "100%",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <BarChartComponent data={sumOperations} width={750} />
    </div>
  );
};

export default AllTime;
