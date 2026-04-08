import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <Dashboard user={user} />
      )}
    </div>
  );
}

export default App;