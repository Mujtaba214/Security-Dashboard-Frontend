import { useEffect, useState } from "react";
import axios from "axios";

export default function SecurityMetrics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("https://security-dashboard-backend-navy.vercel.app/admin/stats/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        console.log(res.data);
        
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p className="text-gray-500">Loading stats...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
        <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalUsers}</p>
      </div>
      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
        <h3 className="text-sm font-medium text-gray-600">Admins</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalAdmins}</p>
      </div>
      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
        <h3 className="text-sm font-medium text-gray-600">Successful Logins</h3>
        <p className="text-2xl font-bold text-red-600">{stats.successfulLogins}</p>
      </div>
      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
        <h3 className="text-sm font-medium text-gray-600">Unsuccessful Logins</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.unsuccessfulLogins}</p>
      </div>
      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
        <h3 className="text-sm font-medium text-gray-600">Blocked IPs</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.blockedIps}</p>
      </div>
    </div>
  );
}
