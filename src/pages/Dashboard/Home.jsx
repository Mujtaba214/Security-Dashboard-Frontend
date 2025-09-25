import SecurityMetrics from "../../components/ecommerce/EcommerceMetrics.jsx";
// import MonthlySalesChart from "../../components/ecommerce/FailedByIPChart.jsx";
import StatisticsChart from "../../components/ecommerce/StatisticsChart.js";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget.js";
import RecentOrders from "../../components/ecommerce/RecentOrders.js";
import DemographicCard from "../../components/ecommerce/DemographicCard.js";
import PageMeta from "../../components/common/PageMeta.js";
import FailedByIPChart from "../../components/ecommerce/FailedByIPChart.jsx";

export default function Home() {
  const storedUser = localStorage.getItem("role");
  console.log(storedUser);

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {storedUser === "admin" ? (
          <div className="col-span-12 space-y-6 xl:col-span-7">
            {/* <SecurityMetrics /> */}

            <FailedByIPChart />
          </div>
        ) : (
          <div className="w-full bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
              Welcome 
            </h2>
          </div>
        )}

        {/* <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div> */}
      </div>
    </>
  );
}
