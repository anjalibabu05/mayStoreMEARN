import React from "react";
import Footer from "../../components/Footer";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../pages/AdminHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Pie,
  PieChart, // ✅ import from recharts (not lucide-react)
} from "recharts";

const AdminHome = () => {
  // 📊 Bar chart data
  const data = [
    { name: "Page A", uv: 4000, pv: 2400 },
    { name: "Page B", uv: 3000, pv: 1398 },
    { name: "Page C", uv: 2000, pv: 9800 },
    { name: "Page D", uv: 2780, pv: 3908 },
    { name: "Page E", uv: 1890, pv: 4800 },
    { name: "Page F", uv: 2390, pv: 3800 },
    { name: "Page G", uv: 3490, pv: 4300 },
  ];

  // 🥧 Pie chart data
  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];

  const data02 = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 },
  ];

  return (
    <>
      <AdminHeader />

      <div className="grid grid-cols-[1fr_4fr]">
        {/* Sidebar */}
        <div className="bg-blue-100 flex flex-col items-center">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="p-10 w-full">
          {/* Summary Cards */}
          <div className="md:grid grid-cols-3 gap-5">
            <div className="bg-blue-900 p-4 flex rounded text-white items-center">
              <FontAwesomeIcon icon={faBook} className="fa-3x" />
              <div className="text-center px-5">
                <h1 className="text-lg">Total no of books</h1>
                <h1 className="text-3xl">100+</h1>
              </div>
            </div>

            <div className="bg-green-900 p-4 flex rounded text-white items-center">
              <FontAwesomeIcon icon={faUser} className="fa-3x" />
              <div className="text-center px-5">
                <h1 className="text-lg">Total Users</h1>
                <h1 className="text-3xl">100+</h1>
              </div>
            </div>

            <div className="bg-amber-400 p-4 flex rounded text-white items-center">
              <FontAwesomeIcon icon={faBook} className="fa-3x" />
              <div className="text-center px-5">
                <h1 className="text-lg">Total Applications</h1>
                <h1 className="text-3xl">100+</h1>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="md:grid grid-cols-2 mt-10 gap-10">
            {/* Bar Chart */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-center text-xl font-semibold mb-4 text-gray-700">
                Bar Chart Example
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" name="Page Views" />
                  <Bar dataKey="uv" fill="#82ca9d" name="Unique Visits" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-center text-xl font-semibold mb-4 text-gray-700">
                Pie Chart Example
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={data01}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                  />
                  <Pie
                    data={data02}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    fill="#82ca9d"
                    label
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminHome;
