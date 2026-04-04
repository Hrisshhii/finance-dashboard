export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md p-4">
        <h1 className="text-xl font-bold mb-6">Finance</h1>
        <nav className="space-y-2">
          <p className="cursor-pointer">Dashboard</p>
          <p className="cursor-pointer">Transactions</p>
          <p className="cursor-pointer">Insights</p>
        </nav>
      </div>

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};