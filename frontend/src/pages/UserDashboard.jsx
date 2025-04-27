import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Papa from "papaparse";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [csvData, setCsvData] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadMessage(response.data.message);
      fetchCsvData(response.data.file.filename); // Fetch the uploaded file
    } catch (error) {
      setUploadMessage("File upload failed. Please try again.");
    }
  };

  const fetchCsvData = async (filename) => {
    try {
      const response = await axios.get(`http://localhost:5000/uploads/${filename}`,
        {
          responseType: "blob", // Set response type to blob for CSV files
        });
        const fileText = await response.data.text(); // Convert the file blob to text
      Papa.parse(fileText, {
        header: true,
        skipEmptyLines: true, // Skip empty rows
        complete: (results) => {
          setCsvData(results.data);
        },
      });
    } catch (error) {
      console.error("Error fetching CSV data:", error);
    }
  };

  const generateChartData = () => {
    if (!csvData.length) return null;

    const labels = csvData.map((entry, index) => entry.Label || `Row ${index + 1}`); // Replace "Label" with your CSV column name
    const values = csvData.map((entry) => parseFloat(entry.Value || 0)); // Replace "Value" with your CSV column name

    return {
      labels,
      datasets: [
        {
          label: "Dataset",
          data: values,
          backgroundColor: labels.map(
            (_, index) =>
              ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"][
                index % 6
              ]
          ),
          borderColor: "#ddd",
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = generateChartData();

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <div className="p-6 border-t border-blue-500">
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm text-blue-200">{user.email}</p>
        </div>
        <nav className="flex-1 p-6">
          <ul className="space-y-4">
            <li>
              <a href="#" className="block text-white hover:text-blue-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block text-white hover:text-blue-300">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="block text-white hover:text-blue-300">
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-6 border-t border-blue-500">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 p-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          <p className="text-gray-600">Welcome to your dashboard!</p>
          <div className="mt-6 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold">Upload CSV</h2>
            <input type="file" onChange={handleFileChange} className="w-full border p-2" />
            <button
              onClick={handleFileUpload}
              className="mt-4 w-full bg-green-500 p-2 text-white hover:bg-green-600"
            >
              Upload
            </button>
            {uploadMessage && <p className="mt-4 text-center text-sm text-gray-600">{uploadMessage}</p>}
          </div>

          {/* Charts */}
          {chartData && (
            <div className="mt-6 w-full max-w-3xl">
              <h2 className="text-xl font-bold mb-4">Bar Chart</h2>
              <Bar data={chartData} />

              <h2 className="text-xl font-bold mt-8 mb-4">Pie Chart</h2>
              <Pie data={chartData} />

              <h2 className="text-xl font-bold mt-8 mb-4">Line Chart</h2>
              <Line data={chartData} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
