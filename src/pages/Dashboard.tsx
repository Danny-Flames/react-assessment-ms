import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setChartData,
  fetchDashboardData,
  fetchTransactions,
  fetchUserData,
} from "../store/slices/dashboardSlice";
import { mockChartData } from "../data/mockData";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import RevenueChart from "../components/RevenueChart";
import TransactionList from "../components/TransactionList";
import FilterModal from "../components/FilterModal";
import DashboardSkeleton from "../components/loaders/DashboardSkeleton";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    availableBalance,
    ledgerBalance,
    totalPayout,
    totalRevenue,
    pendingPayout,
    transactions,
    chartData,
    isLoading,
  } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(setChartData(mockChartData));
  }, [dispatch]);

  const startDate = chartData.length > 0 ? chartData[0].date : "";
  const endDate =
    chartData.length > 0 ? chartData[chartData.length - 1].date : "";

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(
      fetchTransactions({
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        transactionTypes: ["store_transaction", "get_tipped", "withdrawals"],
        transactionStatuses: ["successful", "pending", "failed"],
        page: 1,
        perPage: 20,
      })
    );
  }, [dispatch]);

  return (
    <div className="min-h-screen p-2 sm:p-4 bg-[white]">
      <div className="fixed top-0 left-0 right-0 h-[60px] sm:h-[80px] z-20"></div>

      <Sidebar />
      <Header />
      <FilterModal />

      {/* Show skeleton while loading */}
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        /* Main Content */
        <main className="mx-2 sm:mx-6 lg:mx-32 pt-[80px] sm:pt-[100px] lg:pt-[120px]">
          <div className="flex flex-col lg:flex-row mb-4">
            {/* Left Section - Chart and Transactions */}
            <div className="flex-1 lg:pr-3 mb-6 lg:mb-0">
              <div className="w-full lg:w-[88%]">
                {/* Available Balance and Withdraw Button */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="">
                    <div className="mb-2">
                      <p className="text-sm text-[#56616B]">Available Balance</p>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                      USD{" "}
                      {availableBalance?.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </h1>
                  </div>
                  <div className="md:ml-[6%] sm:ml-auto">
                    <button className="w-full sm:w-auto px-8 py-3 bg-black hover:bg-gray-800 text-white rounded-full text-sm font-medium transition-colors">
                      Withdraw
                    </button>
                  </div>
                </div>

                {/* Chart */}
                <div className="mb-10">
                  <RevenueChart
                    data={chartData}
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
              </div>
            </div>

            {/* Right Sidebar - Balance Cards */}
            <div className="w-full lg:w-80 lg:pl-3 space-y-3 lg:space-y-1">
              <BalanceCard
                label="Ledger Balance"
                amount={ledgerBalance}
                hasInfo
              />
              <BalanceCard label="Total Payout" amount={totalPayout} hasInfo />
              <BalanceCard label="Total Revenue" amount={totalRevenue} hasInfo />
              <BalanceCard
                label="Pending Payout"
                amount={pendingPayout}
                hasInfo
              />
            </div>
          </div>

          {/* Transactions */}
          <div>
            <TransactionList transactions={transactions} />
          </div>
        </main>
      )}
    </div>
  );
};

export default Dashboard;