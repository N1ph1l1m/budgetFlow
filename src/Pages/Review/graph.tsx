import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 4 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 30 },
  { name: 'Group D', value: 201 },
  { name: 'Group E', value: 10 },
  { name: 'Group F', value: 20 },
  { name: 'Group J', value: 10 },
  { name: 'Group D1', value: 40 },

];

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#A28CFF', '#FF66C4', '#4BC0C0', '#9966FF',
  '#FF9F40', '#C9CBCF', '#B5E61D', '#FF6F61',
  '#6A5ACD', '#40E0D0', '#FF6347', '#FFD700',
  '#ADFF2F', '#FF1493', '#7FFFD4', '#DC143C'
];

const RADIAN = Math.PI / 180;

// Кастомная подпись: % внутри, name — снаружи по линии
const renderCustomLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, name,
}) => {
  const radiusInside = innerRadius + (outerRadius - innerRadius) * 0.5;

  const xInside = cx + radiusInside * Math.cos(-midAngle * RADIAN);
  const yInside = cy + radiusInside * Math.sin(-midAngle * RADIAN);

  const radiusOutside = outerRadius + 30; // немного за кругом
  const xOutside = cx + radiusOutside * Math.cos(-midAngle * RADIAN);
  const yOutside = cy + radiusOutside * Math.sin(-midAngle * RADIAN);

  return (
    <>
      {/* процент внутри сектора */}
      {/* <text
        x={xInside}
        y={yInside}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {(percent * 100).toFixed(0)}%
      </text> */}

      {/* имя — снаружи */}
      <text
        x={xOutside}
        y={yOutside}
        fill="#333"
        textAnchor={xOutside > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
      >
        {name}
      </text>
    </>
  );
};

export default function Graph() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          labelLine={true}
          label={renderCustomLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
