import React from "react";
import { MessageSquare, X, Send, CheckCircle } from "lucide-react";
import { useContactForm } from "../../hook/useContactForm"; // Import hook yang kita buat tadi

export function ContactModal() {
  // Ambil semua "otak" dari hook
  const {
    isOpen,
    formData,
    status,
    openModal,
    closeModal,
    handleSubmit,
    handleChange,
  } = useContactForm();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "backdrop") {
      closeModal();
    }
  };

  return (
    <>
      {/* 1. TOMBOL MELAYANG (FAB) */}
      <button
        onClick={openModal}
        className="fixed bottom-6 right-6 p-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 group border border-zinc-800 dark:border-zinc-200"
      >
        <MessageSquare size={24} />
        {/* Label "Let's Talk" yang sempat hilang */}
        <span className="absolute right-full mr-4 bg-zinc-800 text-white text-[10px] uppercase tracking-widest py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
          Let's Talk
        </span>
      </button>

      {/* 2. MODAL FORM */}
      {isOpen && (
        <div
          id="backdrop"
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-md animate-in fade-in duration-300"
        >
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-[2rem] shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden relative animate-in zoom-in-95 duration-300">
            {/* Header Modal */}
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-800/20">
              <div>
                <h3 className="text-lg font-bold dark:text-white">
                  Contact Me
                </h3>
                <p className="text-xs text-zinc-500">
                  I usually reply within 24 hours.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              {status === "success" ? (
                <div className="py-10 text-center animate-in zoom-in duration-300">
                  <CheckCircle
                    size={48}
                    className="mx-auto text-emerald-500 mb-4"
                  />
                  <h4 className="text-xl font-bold dark:text-white">
                    Message Sent!
                  </h4>
                  <p className="text-zinc-500 text-sm">
                    Thanks for reaching out!
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-zinc-400 ml-1">
                      Your Name
                    </label>
                    <input
                      name="name" // Tambahkan name agar sesuai dengan key di formData
                      type="text"
                      required
                      className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                      value={formData.name}
                      onChange={handleChange} // Gunakan handleChange dari hook
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-zinc-400 ml-1">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-zinc-400 ml-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send size={18} /> Send Message
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p className="text-center text-xs text-red-500 font-medium mt-2">
                      Failed to send. Try again!
                    </p>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
