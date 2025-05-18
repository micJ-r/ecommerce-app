import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const pieData = [
    { name: 'Orders', value: 120 },
    { name: 'Products', value: 58 },
    { name: 'Customers', value: 300 },
    { name: 'Pending Orders', value: 8 },
  ];

  const COLORS = ['#3182ce', '#38a169', '#ecc94b', '#e53e3e'];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-600 text-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-3xl mt-2">120</p>
        </div>
        <div className="bg-green-600 text-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-3xl mt-2">58</p>
        </div>
        <div className="bg-yellow-500 text-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold">Customers</h2>
          <p className="text-3xl mt-2">300</p>
        </div>
        <div className="bg-red-600 text-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold">Pending Orders</h2>
          <p className="text-3xl mt-2">8</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-2xl font-semibold mb-4">Analytics Overview</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
