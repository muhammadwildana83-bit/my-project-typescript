import { useState, useEffect, useMemo } from "react";
import axios from "axios";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export function useAdminData() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const userName = localStorage.getItem("userName") || "Admin";

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost/api-portfolio/get_messages.php");
      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Gagal ambil pesan:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!window.confirm("Yakin mau hapus pesan ini?")) return;
    try {
      await axios.post("http://localhost/api-portfolio/delete_message.php", { id });
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (error) {
      alert("Gagal menghapus pesan");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    window.location.href = "/login";
  };

  // Logic Filtering (Gunakan useMemo biar performa kencang)
  const filteredMessages = useMemo(() => {
    return messages.filter(
      (msg) =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [messages, searchTerm]);

  // Logic Export CSV
  const exportToCSV = () => {
    if (messages.length === 0) return alert("Belum ada pesan untuk di-export!");

    const headers = ["ID", "Nama Pengirim", "Email", "Isi Pesan", "Tanggal Masuk"];
    const csvRows = messages.map((msg) => [
      msg.id,
      `"${msg.name.replace(/"/g, '""')}"`,
      msg.email,
      `"${msg.message.replace(/\n/g, " ").replace(/"/g, '""')}"`,
      new Date(msg.created_at).toLocaleString("id-ID"),
    ]);

    const csvContent = [headers, ...csvRows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Portfolio_Inbox_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages: filteredMessages, // Kita return yang sudah difilter saja
    totalCount: messages.length,
    loading,
    userName,
    searchTerm,
    setSearchTerm,
    fetchMessages,
    deleteMessage,
    handleLogout,
    exportToCSV,
  };
}