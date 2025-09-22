import axios from "axios";
import { useEffect, useState } from "react";

const Threats = () => {
  const [threats, setThreats] = useState([]);

  const fetchThreats = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);

      const res = await axios.get("https://security-dashboard-backend-navy.vercel.app/admin/threats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Threats data:", res.data);
      setThreats(res.data.threats || []); // expecting { threats: [...] }
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
        🚨 All Threats
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">IP</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Timestamp
              </th>
              {/* <th className="px-6 py-3 text-center text-sm font-semibold">
                Actions
              </th> */}
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
                    {threat.id}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">
                    {threat.type}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {threat.ip}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        threat.severity === "Critical"
                          ? "bg-red-100 text-red-600 dark:bg-red-600/20 dark:text-red-400"
                          : threat.severity === "High"
                          ? "bg-orange-100 text-orange-600 dark:bg-orange-600/20 dark:text-orange-400"
                          : threat.severity === "Medium"
                          ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-600/20 dark:text-yellow-400"
                          : "bg-green-100 text-green-600 dark:bg-green-600/20 dark:text-green-400"
                      }`}
                    >
                      {threat.severity}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        threat.status === "Active"
                          ? "bg-red-200 text-red-700 dark:bg-red-700/20 dark:text-red-400"
                          : "bg-green-200 text-green-700 dark:bg-green-700/20 dark:text-green-400"
                      }`}
                    >
                      {threat.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">
                    {new Date(threat.timeStamp).toLocaleString()}
                  </td>
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

export default Threats;
