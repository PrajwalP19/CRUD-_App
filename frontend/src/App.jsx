import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);

  // Fetch users
  const getUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, formData);
      setEditId(null);
    } else {
      await axios.post(API_URL, formData);
    }
    setFormData({ name: "", email: "" });
    getUsers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    getUsers();
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email });
    setEditId(user._id);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User CRUD App</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p>{user.email}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
