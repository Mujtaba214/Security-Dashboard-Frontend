import axios from "axios";
import { useEffect, useState } from "react";

const Suspicious = () => {
  const [threats, setThreats] = useState([]);

  const fetchThreats = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);

      const res = await axios.get(
        "http://localhost:3000/admin/suspicious_ips",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Suspicious data:", res.data);
      setThreats(res.data.suspicious_ips || []); // expecting { threats: [...] }
    } catch (error) {
      console.error("Error fetching threats:", error);
    }
  };

  useEffect(() => {
    fetchThreats();
  }, []);

  const unblockIP = async (id) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);

      const res = await axios.put(
        `http://localhost:3000/admin/unblock-ip/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchThreats()
    } catch (error) {
      console.log(error);
      
    }
  }
  const blockIP = async (id) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);

      const res = await axios.put(
        `https://security-dashboard-backend-navy.vercel.app/admin/block-ip/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchThreats()
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        🚨 All Suspicious IPs
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Last Attempt
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Failed Attempt
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Block/UnBlock
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
                  <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">
                    {threat.user_id}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">
                    {new Date(threat.last_attempt).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {threat.failed_attempts}
                  </td>

                  <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {threat.ip_address}
                  </td>
                  <td className="px-6 py-3 text-center space-x-2">
                    {threat.blocked ? (
                      <button
                        onClick={() => unblockIP(threat.id)}
                        className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded-lg shadow"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => blockIP(threat.id)}
                        className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-lg shadow"
                      >
                        Block
                      </button>
                    )}
                  </td>

                  {/* <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        threat.status === "Active"
                          ? "bg-red-200 text-red-700 dark:bg-red-700/20 dark:text-red-400"
                          : "bg-green-200 text-green-700 dark:bg-green-700/20 dark:text-green-400"
                      }`}
                    >
                      {threat.status}
                    </span>
                  </td> */}
                  {/* <td className="px-6 py-3 text-sm text-gray-500">
                    {new Date(threat.timeStamp).toLocaleString()}
                  </td> */}
                  {/* <td className="px-6 py-3 text-center space-x-2">
                    <button className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow">
                      View
                    </button>
                    <button className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-lg shadow">
                      Block IP
                    </button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
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

export default Suspicious;
