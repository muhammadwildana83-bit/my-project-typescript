import { useState } from "react";
import axios from "axios";

export function useCTAAction() {
  const [loading, setLoading] = useState(false);

  const handleAction = async (type: string) => {
    setLoading(true);
    
    const payload = {
      name: "Visitor " + type,
      email: "visitor@example.com",
      message: `User clicked ${type} button on CTA section`
    };

    try {
      // Pastikan port 8000 sesuai dengan settingan Laragon kamu ya!
      const response = await axios.post('http://localhost:8000/submit.php', payload);
      
      if (response.status === 201 || response.status === 200) {
        alert(`Success! Your interest in ${type} has been recorded.`);
      }
    } catch (error) {
      console.error("Gagal mengirim data:", error);
      alert("Terjadi kesalahan koneksi ke server PHP.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleAction };
}