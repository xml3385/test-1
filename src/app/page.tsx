import Dashboard from "@/components/Dashboard";
import AddTransactionForm from "@/components/AddTransactionForm";
import TransactionList from "@/components/TransactionList";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-200">
      <main className="max-w-4xl mx-auto p-4 md:p-8 py-8 md:py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            个人记账工具
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            轻松管理您的收入与支出
          </p>
        </header>

        <Dashboard />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <AddTransactionForm />
          </div>
          <div className="lg:col-span-7">
            <TransactionList />
          </div>
        </div>
      </main>
    </div>
  );
}
