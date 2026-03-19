"use client";

import { useTransactionStore } from "@/store/useTransactionStore";
import { TransactionType } from "@/types";
import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function AddTransactionForm() {
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category || !date) {
      alert("请填写必填项");
      return;
    }

    addTransaction({
      type,
      amount: parseFloat(amount),
      category,
      date,
      note,
    });

    // Reset form mostly
    setAmount("");
    setCategory("");
    setNote("");
  };

  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-700 mb-8">
      <h2 className="text-xl font-semibold mb-6 text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
        <PlusCircle className="w-5 h-5" />
        添加记录
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4 mb-4">
          <label className="flex-1 cursor-pointer">
            <input
              type="radio"
              className="peer sr-only"
              name="type"
              value="expense"
              checked={type === "expense"}
              onChange={() => setType("expense")}
            />
            <div className="text-center p-3 rounded-lg border-2 peer-checked:border-red-500 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/20 peer-checked:text-red-600 dark:peer-checked:text-red-400 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors font-medium">
              支出
            </div>
          </label>
          <label className="flex-1 cursor-pointer">
            <input
              type="radio"
              className="peer sr-only"
              name="type"
              value="income"
              checked={type === "income"}
              onChange={() => setType("income")}
            />
            <div className="text-center p-3 rounded-lg border-2 peer-checked:border-green-500 peer-checked:bg-green-50 dark:peer-checked:bg-green-900/20 peer-checked:text-green-600 dark:peer-checked:text-green-400 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors font-medium">
              收入
            </div>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
              金额 <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-neutral-900 dark:text-neutral-100"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
              分类 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="如：餐饮、交通、工资..."
              className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-neutral-900 dark:text-neutral-100"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
              日期 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-neutral-900 dark:text-neutral-100"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
              备注
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="选填，写点什么..."
              className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-neutral-900 dark:text-neutral-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg transition-colors focus:ring-4 focus:ring-blue-500/50"
        >
          保存记录
        </button>
      </form>
    </div>
  );
}
