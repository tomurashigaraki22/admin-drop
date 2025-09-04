import React, { useState, useEffect } from "react";

export default function AdminScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admins, setAdmins] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // Track which admin is being deleted

  // Fetch admins
  const fetchAdmins = async () => {
    try {
      const res = await fetch("https://dropserver.shop/admin/list");
      const data = await res.json();
      if (data.status === "success") {
        setAdmins(data.admins);
      }
    } catch (err) {
      console.log("❌ Error fetching admins:", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Register admin
  const registerAdmin = async () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }
    try {
      const res = await fetch("https://dropserver.shop/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.status === "success") {
        alert("Admin registered successfully");
        setEmail("");
        setPassword("");
        fetchAdmins();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log("❌ Error registering admin:", err);
    }
  };

  // Delete admin
  const deleteAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    setLoadingId(id);
    try {
      const res = await fetch(`https://dropserver.shop/admin/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.status === "success") {
        fetchAdmins();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log("❌ Error deleting admin:", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-[#F27E05] mb-4">Admin Management</h1>

      {/* Register Form */}
      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Enter admin email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Enter password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={registerAdmin}
        className="bg-[#F27E05] text-white py-2 px-4 rounded hover:opacity-90"
      >
        Register Admin
      </button>

      {/* Admins Table */}
      <h2 className="text-lg font-semibold mt-6 mb-3">Registered Admins</h2>
      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Created At</th>
            <th className="p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id} className="border-b">
              <td className="p-2">{admin.email}</td>
              <td className="p-2">{new Date(admin.created_at).toLocaleString()}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => deleteAdmin(admin.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:opacity-80 disabled:opacity-50"
                  disabled={loadingId === admin.id}
                >
                  {loadingId === admin.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
