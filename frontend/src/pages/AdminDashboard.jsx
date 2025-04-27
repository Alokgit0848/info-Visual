import React, { useEffect, useState } from "react";
import axios from "axios";


export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [uploadedData, setUploadedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockData = [
        { _id: "1", name: "John Doe", email: "john@example.com", role: "user" },
        { _id: "2", name: "Jane Smith", email: "jane@example.com", role: "admin" },
      ];
      setUsers(mockData);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch uploaded data for a specific user
  const fetchUploadedData = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/users/${userId}/data`);
      setUploadedData(response.data);
    } catch (err) {
      setError("Failed to fetch uploaded data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new user
  const handleAddUser = async () => {
    try {
      await axios.post("http://localhost:5000/users", newUser);
      fetchUsers();
      setNewUser({ name: "", email: "", role: "user" });
    } catch (err) {
      setError("Failed to add user. Please try again.");
    }
  };

  // Update user details
  const handleUpdateUser = async (userId, updatedDetails) => {
    try {
      await axios.put(`http://localhost:5000/users/${userId}`, updatedDetails);
      fetchUsers();
    } catch (err) {
      setError("Failed to update user. Please try again.");
    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        fetchUsers();
      } catch (err) {
        setError("Failed to delete user. Please try again.");
      }
    }
  };

  // Delete uploaded data
  const handleDeleteData = async (dataId) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      try {
        await axios.delete(`http://localhost:5000/data/${dataId}`);
        fetchUploadedData(selectedUser._id);
      } catch (err) {
        setError("Failed to delete data. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-600">Manage users and oversee the system.</p>

      {error && <div className="mt-4 text-red-500">{error}</div>}

      {/* Add User */}
      <div className="mt-6 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold">Add User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="w-full mb-2 rounded-md border p-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="w-full mb-2 rounded-md border p-2"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="w-full mb-2 rounded-md border p-2"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleAddUser}
          className="w-full bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Add User
        </button>
      </div>

      {/* User List */}
      <div className="mt-6 w-full max-w-3xl rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold">User List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Role</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border border-gray-300 p-2">{user.name}</td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">{user.role}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        fetchUploadedData(user._id);
                      }}
                      className="bg-green-500 p-1 text-white hover:bg-green-600 mr-2"
                    >
                      View Data
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 p-1 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Uploaded Data */}
      {selectedUser && (
        <div className="mt-6 w-full max-w-3xl rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold">
            Uploaded Data for {selectedUser.name}
          </h2>
          <ul>
            {uploadedData.map((data) => (
              <li key={data._id} className="flex justify-between items-center">
                <span>{data.title}</span>
                <button
                  onClick={() => handleDeleteData(data._id)}
                  className="bg-red-500 p-1 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}