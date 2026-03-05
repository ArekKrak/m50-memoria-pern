import './Navbar.css'

export default function Navbar({ bannerSrc }) {
  return (
    <header>
      <img src={bannerSrc} alt="Memoria banner" width="900" height="300" />
      <h2 className="brand">memoria</h2>
    </header>
  );
}