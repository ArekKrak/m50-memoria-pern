export default function Login() {
  return (
    <div>
      <h1>Sign in</h1>
      <form>
        <input type="email" placeholder="Your Email" required />
        <input type="password" placeholder="Your Password" required />
        <button type="submit">Sign in</button>
      </form>
      <button>Sign in with Google</button>
    </div>
  );
}