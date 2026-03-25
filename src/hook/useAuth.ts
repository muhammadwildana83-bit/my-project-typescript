import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost/api-portfolio/login.php", {
        email,
        password,
      });

      if (res.data.status === "success") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", res.data.username);
        navigate("/admin");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
    goBack: () => navigate("/")
  };
}