import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Adding clickability so the elements supposed to redirect actually do it

const API_URL = import.meta.env.VITE_API_URL;

export default function Navbar({ bannerSrc, user, refreshUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = async () => {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include"
    });

    refreshUser();
    navigate("/");
  };

  return (
    <header>
      <img src={bannerSrc} alt="Memoria banner" width="900" height="300" />
      <h2 className="brand">
        <Link to="/" className='brandLink'>memoria</Link>
      </h2>

      <nav>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button type="button" onClick={handleLogout}>Sign out</button>
          </>
        ) : (
          !isAuthPage && (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/register">Sign up</Link>
            </>
          )
        )}
      </nav>
    </header>
  );
}