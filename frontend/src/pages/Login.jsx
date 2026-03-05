import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  return (
    <div>
      <h1>Sign in</h1>
      <p><Link to="/register" className='signUp'>Sign up</Link> if you don't have an account yet.</p>
      <form>
        <input type="email" placeholder="Your Email" required />
        <input type="password" placeholder="Your Password" required />
        <button type="submit">Sign in</button>
      </form>
      <button className='google'>Sign in with Google</button>
    </div>
  );
}