import { useState } from "react";
import "../css/ModalSesiBaru.css";

export default function ModalSesiBaru({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [maxCollaborators, setMaxCollaborators] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;
    if (maxCollaborators < 1) return;

    onCreate({
      name,
      maxCollaborators
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Buat Sesi Baru</h2>

        <form onSubmit={handleSubmit}>

          {/* Input nama sesi */}
          <label className="modal-label">Nama sesi</label>
          <input
            type="text"
            placeholder="Contoh: UI/UX Meeting"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Input jumlah kolaborator */}
          <label className="modal-label">Jumlah kolaborator</label>
          <input
            type="number"
            value={maxCollaborators}
            min="1"
            onChange={(e) => setMaxCollaborators(Number(e.target.value))}
          />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="create-btn">
              Buat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
