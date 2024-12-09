import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login({ onLogin }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const database = JSON.parse(localStorage.getItem("database")) || [];
    const existingUser = database.find((u) => u.email === user.email);
    if (existingUser) {
      if (existingUser.password === user.password) {
        localStorage.setItem("loggedin", true);
        localStorage.setItem("current_user_email", existingUser.email);
        onLogin();
        navigate("/");
      } else {
        setError("Incorrect password");
      }
    } else {
      const newUser = { email: user.email, password: user.password };
      database.push(newUser);
      localStorage.setItem("database", JSON.stringify(database));
      localStorage.setItem("loggedin", true);
      localStorage.setItem("current_user_email", newUser.email);
      onLogin();
      navigate("/");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <input
          name="email"
          type="email"
          id="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <label htmlFor="email">Email</label>
      </div>
      <div>
        <input
          name="password"
          type="password"
          id="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <label htmlFor="password">Password</label>
      </div>
      <div>
        <button type="submit">Login / Sign Up</button>
      </div>
    </form>
  );
}
export default Login;
