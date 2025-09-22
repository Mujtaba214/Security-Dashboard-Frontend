import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `https://security-dashboard-backend-navy.vercel.app/admin/users?page=${currentPage}&limit=${limit}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
        setTotalUsers(res.data.total);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [currentPage, limit]);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
        Users
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Total Users: {totalUsers}
      </p>

      {/* Search + Page Size Selector */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded w-1/3 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 text-gray-800"
        />
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="px-3 py-2 border rounded dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 text-gray-800"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      {/* Users Table */}
      <table className="min-w-full border border-gray-200 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-left">
            {["ID", "Name", "Email", "Role", "Last Login", "Failed Attempts", "Lock Until"].map(
              (header) => (
                <th
                  key={header}
                  className="px-4 py-2 text-gray-800 dark:text-gray-200"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-t dark:border-gray-700">
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{user.id}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{user.name}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{user.email}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{user.role}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                {user.last_login ? new Date(user.last_login).toLocaleString() : "Never"}
              </td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{user.failed_attempts}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                {user.lock_until ? new Date(user.lock_until).toLocaleString() : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 text-gray-800 dark:text-gray-200"
        >
          Prev
        </button>
        <span className="text-gray-800 dark:text-gray-200">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 text-gray-800 dark:text-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}
