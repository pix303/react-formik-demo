import { useState } from "react";
import "./App.css";
import { TicketRequest } from "./ticket-form";

function App() {
  const [type, setType] = useState<"INFO" | "ISSUE">("ISSUE");
  return (
    <div className="App">
      <TicketRequest ticketNature={type} />
      <button onClick={() => setType((state) => state === "INFO" ? "ISSUE" : "INFO")}>Change ticket type</button>
    </div>
  );
}

export default App;
