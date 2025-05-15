
import { BarChart, CartesianGrid, XAxis, YAxis, Bar,Tooltip ,Legend, Rectangle } from 'recharts';
const BarChartComponent = ({data}) => {
    return (
        <div>
<BarChart width={730} height={250} data={data}
margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="rate" fill="#8884d8" activeBar={<Rectangle fill="red" stroke="blue" />} />
  <Bar dataKey="income" fill="#82ca9d" activeBar={<Rectangle fill="blue" stroke="purple" />} />
</BarChart>
        </div>
    );
};

export default BarChartComponent;
