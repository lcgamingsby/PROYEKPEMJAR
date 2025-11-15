import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/SessionsPage.css";
import ModalSesiBaru from "../components/ModalSesiBaru";

export default function SessionPage() {
  const [sessions, setSessions] = useState([]);
  const { token, logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const [showJoinBox, setShowJoinBox] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) logout();
    setSessions([]);
    navigate("/");
  };

  const handleCreateSession = async (payload) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/sessions`,
        {
          name: payload.name,
          maxCollaborators: payload.maxCollaborators,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "1",
          },
        }
      );

      const created = res.data;
      setSessions((prev) => [created, ...prev]);
      alert(`Sesi dibuat — kode akses: ${created.code}`);
    } catch (err) {
      console.error("create session err:", err);
      alert("Gagal membuat sesi");
    } finally {
      setShowModal(false);
    }
  };

  const handleJoinSession = async () => {
    if (!joinCode.trim()) {
      alert("Masukkan kode sesi dulu.");
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/sessions/join/${joinCode}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "1",
          },
        }
      );

      const session = res.data;

      if (!session || !session.id) {
        alert("Sesi tidak ditemukan.");
        return;
      }

      navigate(`/sessions/${session.id}`);
    } catch (err) {
      console.error("join session error:", err);
      alert("Kode salah atau sesi tidak ada.");
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetchSessions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/sessions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "1",
            },
          }
        );

        setSessions(res.data.sessions || []);
      } catch (err) {
        console.error("fetch sessions error:", err);
        setSessions([]);
      }
    };

    fetchSessions();
  }, [token]);

  return (
    <>
      <div className="sessions-container">
        <div className="sessions-content">
          <div className="sessions-header">
            <h1>Daftar Sesi Kolaborasi</h1>

            <div className="header-actions">
              <button
                className="new-session-btn"
                onClick={() => setShowModal(true)}
              >
                Buat Sesi Baru
              </button>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          {/* Tombol toggle Join Session */}
          <button
            className="join-toggle-btn"
            onClick={() => setShowJoinBox(!showJoinBox)}
          >
            {showJoinBox ? "Tutup" : "Gabung Dengan Kode"}
          </button>

          {/* Join Box muncul jika tombol ditekan */}
          {showJoinBox && (
            <div className="join-box">
              <input
                type="text"
                placeholder="Masukkan kode sesi..."
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
              />
              <button onClick={handleJoinSession}>Gabung</button>
            </div>
          )}

          {sessions.length === 0 ? (
            <p>Tidak ada sesi aktif.</p>
          ) : (
            sessions.map((s) => (
              <Link key={s.id} to={`/sessions/${s.id}`}>
                <div className="session-card">
                  <div className="session-name">{s.name}</div>
                  <div className="session-status">{s.status}</div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <ModalSesiBaru
          onClose={() => setShowModal(false)}
          onCreate={handleCreateSession}
        />
      )}
    </>
  );
}
