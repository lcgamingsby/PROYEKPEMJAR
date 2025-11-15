import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../css/SessionsDetailPage.css";

import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

export default function SessionDetailPage() {
  const [code, setCode] = useState(`# Python code di sini...\nprint("Hello world!")`);
  const [output, setOutput] = useState("");
  const { token } = useContext(AuthContext);
  const [wsConn, setWsConn] = useState(null);

  // --- WebSocket connect ---
  useEffect(() => {
    if (!token) return;
    const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}?token=${token}`);

    ws.onopen = () => console.log("WS connected");

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === "output") {
        setOutput((prev) => prev + data.content + "\n");
      }
    };

    ws.onclose = () => console.log("WS closed");

    setWsConn(ws);
    return () => ws.close();
  }, [token]);

  // --- Run / Kirim code ke backend ---
  const runCode = () => {
    if (!wsConn) return;

    wsConn.send(
      JSON.stringify({
        type: "run",
        language: "python",
        code: code,
      })
    );

    setOutput(""); // reset output setiap run
  };

  return (
    <div className="session-detail-container">
      <div className="session-two-col">
        
        {/* LEFT PANEL — Code Editor */}
        <div className="code-panel">
          <div className="panel-header">
            <h3>Python Editor</h3>
            <button className="run-btn" onClick={runCode}>Run ▶</button>
          </div>

          <CodeMirror
            value={code}
            height="90vh"
            theme="dark"
            extensions={[python()]}
            onChange={(value) => setCode(value)}
          />
        </div>

        {/* RIGHT PANEL — Output */}
        <div className="output-panel">
          <div className="panel-header"><h3>Output</h3></div>

          <pre className="output-box">{output}</pre>
        </div>
      </div>
    </div>
  );
}
