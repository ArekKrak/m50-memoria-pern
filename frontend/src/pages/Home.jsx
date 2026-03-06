import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='welcomeText'>
      <h1>Welcome to memoria.</h1>
      <nav className='nav'>
        <Link to="/login">Sign in</Link>
        <Link to="/register">Sign up</Link>
      </nav>
    </div>
  );
}