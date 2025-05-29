import { PieChart, Pie, Cell, Legend } from 'recharts';
import styles from "../../app/styles/DataPieChart.module.css"
import { useEffect, useState } from 'react';

interface IDataPie {
  name: string;
  value: number;
}

interface DataPieChartProps {
  data: IDataPie[];
}

const DataPieChart = ({ data }: DataPieChartProps) => {

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
    '#A28CFF', '#FF66C4', '#4BC0C0', '#9966FF',
    '#FF9F40', '#C9CBCF', '#B5E61D', '#FF6F61',
    '#6A5ACD', '#40E0D0', '#FF6347', '#FFD700',
    '#ADFF2F', '#FF1493', '#7FFFD4', '#DC143C'
  ];

const [width, setWidth] = useState(window.innerWidth);

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

  return (
    <div className={styles.wrapGraph}>
      <PieChart width={450} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={width <= 501 ? 80:120}
          labelLine={false}
          label={false}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Legend layout="vertical" align={width <= 501 ? "center":"right"} verticalAlign={width <=501 ? "bottom":"middle"}  />
      </PieChart>
    </div>
  );
};

export default DataPieChart;
