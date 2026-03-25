import { Loader2, Lock, Mail, ChevronLeft } from "lucide-react";
import { useAuth } from "../hook/useAuth";

export default function LoginPage() {
  const { setEmail, setPassword, loading, error, handleLogin, goBack } =
    useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6 selection:bg-zinc-900 selection:text-white">
      {/* Back Button */}
      <button
        onClick={goBack}
        className="fixed top-8 left-8 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
      >
        <ChevronLeft size={16} /> Back to site
      </button>

      <div className="w-full max-w-[400px] animate-in fade-in zoom-in duration-500">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-xl mb-6">
            <Lock size={28} />
          </div>
          <h2 className="text-3xl font-black tracking-tight dark:text-white">
            ADMIN{" "}
            <span className="text-zinc-400 font-light italic">ACCESS</span>
          </h2>
          <p className="text-sm text-zinc-500 mt-2 font-medium">
            Enter your credentials to manage dashboard.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-[2.5rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 backdrop-blur-xl">
          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-xs font-bold text-center animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors"
                    size={18}
                  />
                  <input
                    type="email"
                    required
                    disabled={loading}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 dark:text-white focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white outline-none transition-all placeholder:text-zinc-300"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 ml-1">
                  Security Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors"
                    size={18}
                  />
                  <input
                    type="password"
                    required
                    disabled={loading}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 dark:text-white focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white outline-none transition-all placeholder:text-zinc-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-lg hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Authorize"
              )}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-zinc-400 font-medium">
          Protected by Portfolio Security &bull; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
