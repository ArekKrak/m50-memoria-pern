import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/dashboard");

    /* try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        navigate("/dashboard");
      } else {
        setError("Registration failed.");
        setPassword("");
      }
    } catch (err) {
      console.error("Network error", err);
    } */
  };

  return (
    <div>
      <h1>Sign up</h1>
      <p>Already signed up? <Link to="/login" className="signIn"> Sign in here</Link></p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign up</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}