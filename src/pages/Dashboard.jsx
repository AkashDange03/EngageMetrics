import React, { useState } from 'react';
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
  Label,
} from 'recharts';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import ChatClient from './ChatClient';

// Generate more realistic mock data
const generateMockData = () => {
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-03-31');
  const posts = [];
  const postTypes = ['Reel', 'Carousel', 'Static'];

  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const numPosts = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < numPosts; i++) {
      const postType = postTypes[Math.floor(Math.random() * postTypes.length)];
      const baseEngagement = {
        Reel: { likes: [800, 2000], shares: [100, 500], comments: [50, 300] },
        Carousel: {
          likes: [500, 1500],
          shares: [80, 300],
          comments: [30, 200],
        },
        Static: { likes: [300, 1000], shares: [50, 200], comments: [20, 150] },
      }[postType];

      const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

      posts.push({
        Post_ID: `${date.toISOString().split('T')[0]}-${i + 1}`,
        Post_Type: postType,
        Likes: randomInRange(baseEngagement.likes[0], baseEngagement.likes[1]),
        Shares: randomInRange(baseEngagement.shares[0], baseEngagement.shares[1]),
        Comments: randomInRange(baseEngagement.comments[0], baseEngagement.comments[1]),
        Date_Posted: date.toISOString().split('T')[0],
      });
    }
  }

  return posts;
};

const mockPosts = generateMockData();

const Dashboard = () => {
  const [selectedTypes, setSelectedTypes] = useState('all');
  const [posts, setPosts] = useState(mockPosts);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleExport = () => {
    const headers = ['Post_ID', 'Post_Type', 'Likes', 'Shares', 'Comments', 'Date_Posted'];
    const rows = posts.map(post => [
      post.Post_ID,
      post.Post_Type,
      post.Likes,
      post.Shares,
      post.Comments,
      post.Date_Posted,
    ]);

    let csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'social_media_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredPosts = posts.filter(
    (post) => selectedTypes === 'all' || post.Post_Type === selectedTypes
  );

  const totalLikes = filteredPosts.reduce((total, post) => total + post.Likes, 0);
  const totalShares = filteredPosts.reduce((total, post) => total + post.Shares, 0);
  const totalComments = filteredPosts.reduce((total, post) => total + post.Comments, 0);

  const postTypeCounts = posts.reduce((acc, post) => {
    acc[post.Post_Type] = (acc[post.Post_Type] || 0) + 1;
    return acc;
  }, {});

  const totalPosts = filteredPosts.length;

  const reelPercentage = ((postTypeCounts.Reel || 0) / totalPosts) * 100;
  const carouselPercentage = ((postTypeCounts.Carousel || 0) / totalPosts) * 100;
  const staticPercentage = ((postTypeCounts.Static || 0) / totalPosts) * 100;

  const pieData = [
    { name: 'Reel', value: postTypeCounts.Reel || 0 },
    { name: 'Carousel', value: postTypeCounts.Carousel || 0 },
    { name: 'Static', value: postTypeCounts.Static || 0 },
  ];

  const colors = ['#FF6384', '#36A2EB', '#FFCE56'];

  const [chatExpanded, setChatExpanded] = useState(false);

  // Function to handle AI button click
  const handleAiButtonClick = () => {
    setChatExpanded(true);
  };

  return (
    <div className="h-screen  flex flex-col bg-gray-50">
        <Header/>

      {/* Main Content */}
      <main className=" flex-1 p-8 space-y-8 mt-16 ">
        {/* Dropdown and Export Section */}
        <div className="flex justify-between items-center">
          <select
            value={selectedTypes}
            onChange={(e) => setSelectedTypes(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Post Types</option>
            <option value="Reel">Reel</option>
            <option value="Carousel">Carousel</option>
            <option value="Static">Static</option>
          </select>
          <button
            onClick={handleExport}
            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Export CSV
          </button>
        </div>

        {/* Pie Chart Section */}
        <div className="flex flex-wrap gap-8 items-center">
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Post Type Distribution</h2>
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

          {/* Total Distribution */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Total Distribution & Engagement</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Likes:</span>
                <span className="font-bold text-indigo-600">{totalLikes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Comments:</span>
                <span className="font-bold text-yellow-600">{totalComments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Shares:</span>
                <span className="font-bold text-green-600">{totalShares}</span>
              </div>
            </div>
          </div>

          {/* Engagement Percentages */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Engagement Percentages</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Reel Engagement:</span>
                <span className="font-bold text-pink-600">{reelPercentage.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Carousel Engagement              :</span>
                <span className="font-bold text-blue-600">{carouselPercentage.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Static Engagement:</span>
                <span className="font-bold text-orange-600">{staticPercentage.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Line Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Engagement Over Time</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredPosts} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date_Posted" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Likes" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Shares" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Comments" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <ChatClient
          isExpanded={chatExpanded}
          setIsExpanded={setChatExpanded}
        />
      </main>

      {/* Footer */}
     <Footer/>
    </div>
  );
};

export default Dashboard;

