import './Navbar.css';
import { Link } from 'react-router-dom'; // Adding clickability so the elements supposed to redirect actually do it

export default function Navbar({ bannerSrc }) {
  return (
    <header>
      <img src={bannerSrc} alt="Memoria banner" width="900" height="300" />
      <h2 className="brand">
        <Link to="/" className='brandLink'>memoria</Link>
      </h2>
      <nav className='nav'>
        <Link to="/login">Sign in</Link>
        <Link to="/register">Sign up</Link>
      </nav>
    </header>
  );
}