"use client";

import { useTransactionStore } from "@/store/useTransactionStore";
import { Trash2, ListOrdered, Calendar, Tag } from "lucide-react";
import { useEffect, useState } from "react";

export default function TransactionList() {
  const transactions = useTransactionStore((state) => state.transactions);
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-700 h-[300px] animate-pulse"></div>
    );
  }

  // Sort by date descending
  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-700">
      <h2 className="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
        <ListOrdered className="w-5 h-5" />
        历史记录
      </h2>

      {sortedTransactions.length === 0 ? (
        <div className="text-center py-10 text-neutral-500 dark:text-neutral-400 flex flex-col items-center gap-3">
          <Calendar className="w-12 h-12 opacity-50" />
          <p>暂无账单记录，去记一笔吧！</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedTransactions.map((t) => (
            <div
              key={t.id}
              className="group flex items-center justify-between p-4 rounded-lg border border-neutral-100 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-neutral-500" />
                    {t.category}
                  </span>
                  {t.note && (
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded-full">
                      {t.note}
                    </span>
                  )}
                </div>
                <div className="text-sm text-neutral-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {t.date}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`text-lg font-bold ${
                    t.type === "income"
                      ? "text-green-600 dark:text-green-500"
                      : "text-red-600 dark:text-red-500"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}¥{t.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="删除记录"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
