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
  return (
    <div>

      <BarChart
        width={width || 200}
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
        <Bar dataKey="income" fill="blue" />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
