import { useState } from "react";
import axios from "axios";

// 1. Definisi tipe data agar TypeScript tidak komplain
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = "" | "loading" | "success" | "error";

export function useContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({ 
    name: "", 
    email: "", 
    message: "" 
  });
  const [status, setStatus] = useState<FormStatus>("");

  // Fungsi untuk reset dan tutup modal
  const closeModal = () => {
    setIsOpen(false);
    setStatus("");
    setFormData({ name: "", email: "", message: "" });
  };

  const openModal = () => setIsOpen(true);

  // 2. Logic pengiriman data (pindahan dari UI)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      // Endpoint PHP di Laragon
      await axios.post("http://localhost/api-portfolio/send_message.php", formData);
      setStatus("success");
      
      // Auto close setelah sukses
      setTimeout(() => {
        closeModal();
      }, 2500);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  // 3. Helper untuk handle input change agar form tetap sinkron
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return {
    isOpen,
    formData,
    status,
    openModal,
    closeModal,
    handleSubmit,
    handleChange
  };
}