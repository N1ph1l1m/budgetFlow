import { useState,useEffect } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
} from "recharts";
interface IDataBart{
  name?:string,
  rate:number,
  income:number
}

interface IBartCharInterface{
  data:IDataBart[],
  width?:number
}




const BarChartComponent = ({ data,width }:IBartCharInterface) => {

  const [widthWindow, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const  adaptivBar =()=>{
    if(widthWindow <= 360)
      {return 250}
    else if(widthWindow <= 520){
      return 400
    }else if(widthWindow <= 700){
      return 550
    }else if(width){
      return Number(width)
    }else{
      return 200
    }
  }
  return (
    <div>


      <BarChart
        width={adaptivBar()}
        height={250}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="rate" id="rate" label="Расходы" fill="red" />
        <Bar dataKey="income" fill="green" />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
