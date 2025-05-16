import { PieChart, Pie, Cell, Legend } from 'recharts';
import styles from "../../app/styles/DataPieChart.module.css"


const   DataPieChart = ({data})=> {

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#A28CFF', '#FF66C4', '#4BC0C0', '#9966FF',
  '#FF9F40', '#C9CBCF', '#B5E61D', '#FF6F61',
  '#6A5ACD', '#40E0D0', '#FF6347', '#FFD700',
  '#ADFF2F', '#FF1493', '#7FFFD4', '#DC143C'
];
  return (
    <div className={styles.wrapGraph}   >
  <PieChart   width={450} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          labelLine={false}
          label={false}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Legend  layout="vertical" align="right" verticalAlign="middle"  />
      </PieChart>
    </div>


  );
}
export default DataPieChart;
