import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { ITransactionData } from "../../store/Slice/transactionsSlice/transactionsSlice";
import BarChartComponent from "../../shared/Charts/BarChart";

const AllTime = () => {
    const [listMonth,setListMonth] = useState<Record<string, ITransactionData[]>>({});
    const [sumOperations,setSumOperations] = useState<Record<string, ITransactionData[]>>({});
    const {transactionState} = useSelector((state:RootState)=>state.transactionsSlice)


function groupToMonth() {
    return transactionState.reduce((acc:Record<string, typeof item[]>, item) => {
    const option: object = { month: "long" };
    const dateMonth =new Date(item.date)

    const month = dateMonth.toLocaleDateString("ru-RU", option)
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(item);
    return acc;
  }, {});
}

function sumPriceOperation() {
  const result: Record<string, { name: string; rate: number; income: number }> = {};

  for (const i in listMonth) {
    const filterRate = listMonth[i].filter(item => item.typeOperation === 'rate');
    const filterIncome = listMonth[i].filter(item => item.typeOperation === 'income');

    filterRate.forEach(item => {
      const month = new Date(item.date).toLocaleDateString("ru-RU", { month: "long" });
      if (!result[month]) {
        result[month] = { name: month, rate: 0, income: 0 };
      }
      result[month].rate += Number(item.price);
    });

    filterIncome.forEach(item => {
      const month = new Date(item.date).toLocaleDateString("ru-RU", { month: "long" });
      if (!result[month]) {
        result[month] = { name: month, rate: 0, income: 0 };
      }
      result[month].income += Number(item.price);
    });
  }

  return Object.values(result);
}
    useEffect(()=>{
        setListMonth(groupToMonth())
    },[])

    useEffect(()=>{
        setSumOperations(sumPriceOperation())
    },[listMonth])


    return (
        <div style={{display:"flex",width:"100px%" , height:"100%", justifyContent:"center",marginTop:"50px"}}>
           <BarChartComponent data={sumOperations} width={750}/>
        </div>
    );
};

export default AllTime;
