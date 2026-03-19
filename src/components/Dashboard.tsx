"use client";

import { useTransactionStore } from "@/store/useTransactionStore";
import { useEffect, useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

export default function Dashboard() {
  const transactions = useTransactionStore((state) => state.transactions);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // To fix react-hooks/set-state-in-effect warning when simply avoiding hydration mismatch
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-neutral-800 p-5 md:p-6 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-700 animate-pulse h-[116px]"></div>
        ))}
      </div>
    );
  }

  // Calculate Total Assets (All Time)
  const totalAssets = transactions.reduce((acc, curr) => {
    return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
  }, 0);

  // Calculate Current Month Income & Expense
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const currentMonthTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    );
  });

  const monthlyIncome = currentMonthTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const monthlyExpense = currentMonthTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-8">
      {/* Total Assets */}
      <div className="bg-white dark:bg-neutral-800 p-5 md:p-6 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-700 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 mb-1 md:mb-2">
          <Wallet className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
          <h3 className="text-sm font-medium">总资产</h3>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          ¥{totalAssets.toFixed(2)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:hidden">
        {/* Mobile: Monthly Income */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-700 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 mb-1">
            <ArrowUpCircle className="w-4 h-4 text-green-500" />
            <h3 className="text-xs font-medium">当月收入</h3>
          </div>
          <p className="text-lg font-bold text-green-600 dark:text-green-500 truncate">
            ¥{monthlyIncome.toFixed(2)}
          </p>
        </div>

        {/* Mobile: Monthly Expense */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-700 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 mb-1">
            <ArrowDownCircle className="w-4 h-4 text-red-500" />
            <h3 className="text-xs font-medium">当月支出</h3>
          </div>
          <p className="text-lg font-bold text-red-600 dark:text-red-500 truncate">
            ¥{monthlyExpense.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Desktop: Monthly Income */}
      <div className="hidden md:flex bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-700 flex-col justify-between">
        <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 mb-2">
          <ArrowUpCircle className="w-5 h-5 text-green-500" />
          <h3 className="text-sm font-medium">当月总收入</h3>
        </div>
        <p className="text-3xl font-bold text-green-600 dark:text-green-500">
          ¥{monthlyIncome.toFixed(2)}
        </p>
      </div>

      {/* Desktop: Monthly Expense */}
      <div className="hidden md:flex bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-700 flex-col justify-between">
        <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 mb-2">
          <ArrowDownCircle className="w-5 h-5 text-red-500" />
          <h3 className="text-sm font-medium">当月总支出</h3>
        </div>
        <p className="text-3xl font-bold text-red-600 dark:text-red-500">
          ¥{monthlyExpense.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
