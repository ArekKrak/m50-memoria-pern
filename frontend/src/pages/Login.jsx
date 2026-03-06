import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handler to intercept the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // Allows the browser to store the session cookie the backend sends. Without it, authentication fails
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        navigate("/dashboard"); // Here's the moment the application crosses a threshold.
      } else {
        setError("Invalid email or password");
        setPassword("");
      }
    } catch (err) {
      console.error("Network error", err);
      setError("Login failed");
    }
  };

  return (
    <div>
      <h1>Sign in</h1>
      <p><Link to="/register" className='signUp'>Sign up</Link> if you don't have an account yet.</p>
      
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
        <button type="submit">Sign in</button>

      </form>
      {error && <p className="error">{error}</p>}
      
      <button 
        className='google'
        type="button"
        onClick={() => window.location.href = "http://localhost:3000/auth/google"}
      >
        Sign in with Google
      </button>
    </div>
  );
}