import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom'; // Adding clickability so the elements supposed to redirect actually do it

export default function Navbar({ bannerSrc, user, refreshUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:3000/logout", {
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
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}