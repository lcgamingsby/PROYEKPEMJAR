import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { login as loginApi, register as registerApi } from "../api/auth"; // ⬅️ Tambah register API
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false); // ⬅️ toggle mode
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // ⬅️ tambahan field register
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        // REGISTER MODE
        await registerApi(name, email, password);
        alert("Pendaftaran berhasil! Silakan login.");
        setIsRegister(false);
      } else {
        // LOGIN MODE
        const data = await loginApi(email, password);
        login(data.token);
        navigate("/sessions");
      }
    } catch (err) {
      console.error(err);
      alert(isRegister ? "Pendaftaran gagal!" : "Login gagal!");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>{isRegister ? "Daftar Akun" : "Login"}</h1>

        {isRegister && (
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{isRegister ? "Daftar" : "Masuk"}</button>

        <p className="toggle-text">
          {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
          <span
            className="toggle-link"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login di sini" : "Daftar di sini"}
          </span>
        </p>
      </form>
    </div>
  );
}
