import React, { useState } from 'react';
import Papa from 'papaparse';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState('all');

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (result) {
          const parsedData = result.data;
          const columnArray = Object.keys(parsedData[0] || {});
          setData(parsedData);
          setColumns(columnArray);
        },
      });
    }
  };

  const filteredData =
    selectedTypes === 'all'
      ? data
      : data.filter((item) => item.Post_Type === selectedTypes);

  const postTypeCounts = filteredData.reduce((acc, item) => {
    acc[item.Post_Type] = (acc[item.Post_Type] || 0) + 1;
    return acc;
  }, {});

  const totalLikes = filteredData.reduce(
    (total, item) => total + (parseInt(item.Likes, 10) || 0),
    0
  );
  const totalShares = filteredData.reduce(
    (total, item) => total + (parseInt(item.Shares, 10) || 0),
    0
  );
  const totalComments = filteredData.reduce(
    (total, item) => total + (parseInt(item.Comments, 10) || 0),
    0
  );

  const pieData = Object.keys(postTypeCounts).map((key) => ({
    name: key,
    value: postTypeCounts[key],
  }));

  const colors = ['#22C55E', '#16A34A', '#A7F3D0', '#4BC0C0', '#9966FF'];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-r from-green-100 to-green-50 text-gray-800">
      {/* Header */}
      <header className="text-center py-8 bg-green-600 text-white shadow-md rounded-b-lg">
        <h1 className="text-4xl font-extrabold tracking-tight">Social Media Analytics Dashboard</h1>
        <p className="text-lg mt-2 font-light opacity-80">
          Upload a CSV file to generate real-time insights.
        </p>
        <input
          type="file"
          accept=".csv"
          onChange={handleFile}
          className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg cursor-pointer transition-all hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8">
        {/* Dropdown Section */}
        <div className="flex justify-center md:justify-between items-center flex-wrap gap-6">
          <select
            value={selectedTypes}
            onChange={(e) => setSelectedTypes(e.target.value)}
            className="px-6 py-3 bg-white border-2 border-green-300 rounded-lg shadow-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          >
            <option value="all">All Post Types</option>
            {columns.includes('Post_Type') &&
              [...new Set(data.map((item) => item.Post_Type))].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
          </select>
        </div>

        {/* Pie Chart and Total Engagement Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Pie Chart */}
          <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Post Type Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Total Engagement */}
          <div className="w-full md:w-1/2 p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Total Post Distributions</h2>
            <div className="space-y-6">
              <div className="flex justify-between">
                <span className="text-gray-600 text-xl">Total Likes:</span>
                <span className="font-semibold text-green-600 text-2xl">{totalLikes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-xl">Total Comments:</span>
                <span className="font-semibold text-green-700 text-2xl">{totalComments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-xl">Total Shares:</span>
                <span className="font-semibold text-green-500 text-2xl">{totalShares}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Line Chart Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Engagement Over Time</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date_Posted" tick={{ fill: '#4B5563' }} />
              <YAxis
                tick={{ fill: '#4B5563' }}
                domain={[0, 1000]}
                tickFormatter={(value) =>
                  value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value
                }
              />
              <Tooltip
                formatter={(value) =>
                  typeof value === 'number'
                    ? value >= 1000
                      ? `${(value / 1000).toFixed(1)}K`
                      : value
                    : value
                }
              />
              <Legend wrapperStyle={{ color: '#4B5563' }} />
              <Line
                type="monotone"
                dataKey="Likes"
                stroke="#4BC0C0"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line type="monotone" dataKey="Shares" stroke="#16A34A" strokeWidth={2} />
              <Line type="monotone" dataKey="Comments" stroke="#A7F3D0" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
