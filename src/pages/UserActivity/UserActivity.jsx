import axios from "axios";
import { useEffect, useState } from "react";

const UserActivity = () => {
  const [threats, setThreats] = useState([]);

  const fetchThreats = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);

      const res = await axios.get("https://security-dashboard-backend-navy.vercel.app/admin/user-activity", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Suspicious data:", res.data);
      setThreats(res.data.activity || []);
    } catch (error) {
      console.error("Error fetching threats:", error);
    }
  };

  useEffect(() => {
    fetchThreats();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        🚨 All User Activity Logs
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <th className="px-4 py-2 text-left text-sm font-semibold">ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                User ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                IP Address
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                User Agent
              </th>
            </tr>
          </thead>
          <tbody>
            {threats.length > 0 ? (
              threats.map((threat, i) => (
                <tr
                  key={threat.id}
                  className={`${
                    i % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800/50"
                      : "bg-white dark:bg-gray-900"
                  } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
                >
                  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                    {threat.id}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                    {threat.user_id}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                    {threat.ip_address}
                  </td>
                  <td
                    className={`px-4 py-2 text-sm ${
                      threat.success ? "text-green-800" : "text-red-600"
                    }`}
                  >
                    {threat.success ? "Success" : "Failed"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                    {threat.user_agent}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-2 text-center text-gray-500 dark:text-gray-400"
                >
                  ✅ No threats detected
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserActivity;
