// src/App.jsx
import React, { useState } from "react";
import Resume from "./components/Resume";
import AdminPage from "./components/AdminPage";
import './App.css'
const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div>
      <header>
        <button onClick={() => setIsAdmin(!isAdmin)}>
          {isAdmin ? "Go to Resume" : "Go to Admin"}
        </button>
      </header>

      {isAdmin ? <AdminPage /> : <Resume />}
    </div>
  );
};

export default App;
