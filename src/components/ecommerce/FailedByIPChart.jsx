import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function FailedByIPChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://security-dashboard-backend-navy.vercel.app/admin/ip-fails", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setData(res.data);
        console.log(res.data);
        
      } catch (err) {
        console.error("Error fetching IP fails:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Failed Logins by IP</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="ip_address" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="fails" fill="#f87171" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
