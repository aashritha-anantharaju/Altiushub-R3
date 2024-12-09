import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Login from "./pages/Login";
import TaskList from "./pages/TaskList";
import TaskCreate from "./pages/TaskCreate";
import TaskEdit from "./pages/TaskEdit";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProfileUpdate from "./pages/ProfileUpdate";

function MenuBar({ isLoggedIn, onLogout }) {
  return (
    <nav className="menubar">
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <>
          <Link to="/tasks">Tasks</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("loggedin") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("current_user_email");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <MenuBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className="content">
          <Routes>
            <Route
              path="/login"
              element={<Login onLogin={() => setIsLoggedIn(true)} />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfileUpdate />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/tasks/create" element={<TaskCreate />} />
              <Route path="/tasks/edit/:id" element={<TaskEdit />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
