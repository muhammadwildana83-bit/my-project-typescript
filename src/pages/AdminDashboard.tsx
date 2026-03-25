import React from "react";
import {
  LogOut,
  Mail,
  Calendar,
  Trash2,
  Reply,
  RefreshCw,
  Download,
  Search,
} from "lucide-react";
import { useAdminData } from "../hook/useAdminData";

const AdminDashboard: React.FC = () => {
  const {
    messages,
    totalCount,
    loading,
    userName,
    searchTerm,
    setSearchTerm,
    fetchMessages,
    deleteMessage,
    handleLogout,
    exportToCSV,
  } = useAdminData();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Dashboard */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              Admin Panel
            </h1>
            <p className="text-zinc-500 text-sm">
              Active Session:{" "}
              <span className="font-medium text-zinc-900 dark:text-zinc-300">
                {userName}
              </span>
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Cari nama atau pesan..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-zinc-400"
              size={16}
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={exportToCSV}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 transition-all border border-emerald-100"
            >
              <Download size={18} />
              <span className="hidden sm:inline text-sm">Export CSV</span>
            </button>

            <button
              onClick={fetchMessages}
              className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 transition-all text-zinc-600"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>

            <button
              onClick={handleLogout}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-lg hover:bg-red-100 border border-red-100"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          </div>
        </header>

        {/* Content Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <Mail size={20} className="text-zinc-400" />
            {/* totalCount menunjukkan semua pesan di DB, messages.length menunjukkan hasil filter */}
            Messages ({messages.length} of {totalCount})
          </h2>

          {messages.length === 0 && !loading ? (
            <div className="text-center p-16 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white dark:bg-zinc-900/50">
              <Mail size={48} className="mx-auto mb-4 text-zinc-300" />
              <p className="text-zinc-500 font-medium">
                {searchTerm
                  ? `Tidak ada pesan untuk "${searchTerm}"`
                  : "No messages found."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {messages.map((msg) => (
                <MessageCard key={msg.id} msg={msg} onDelete={deleteMessage} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sub-komponen biar makin rapi (bisa kamu pindah ke file sendiri nanti)
const MessageCard = ({
  msg,
  onDelete,
}: {
  msg: any;
  onDelete: (id: number) => void;
}) => (
  <div className="group bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-900 transition-all relative overflow-hidden">
    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <a
        href={`mailto:${msg.email}`}
        className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 rounded-full hover:text-black shadow-sm"
      >
        <Reply size={16} />
      </a>
      <button
        onClick={() => onDelete(msg.id)}
        className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full hover:bg-red-500 hover:text-white shadow-sm transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>

    <div className="flex items-center gap-4 mb-4">
      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 flex items-center justify-center text-zinc-500 font-bold border border-zinc-200 dark:border-zinc-700">
        {msg.name.charAt(0).toUpperCase()}
      </div>
      <div className="overflow-hidden">
        <h3 className="font-bold text-zinc-900 dark:text-white truncate pr-16">
          {msg.name}
        </h3>
        <p className="text-xs text-zinc-500 truncate">{msg.email}</p>
      </div>
    </div>

    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-4 min-h-[60px]">
      "{msg.message}"
    </p>

    <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-[10px] text-zinc-400">
      <span className="uppercase tracking-wider font-semibold flex items-center gap-1.5">
        <Calendar size={12} />{" "}
        {new Date(msg.created_at).toLocaleDateString("id-ID")}
      </span>
      <span className="font-mono">ID: {msg.id}</span>
    </div>
  </div>
);

export default AdminDashboard;
