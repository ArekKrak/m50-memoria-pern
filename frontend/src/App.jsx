import memoriaLogo from '/banner.svg'
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'

function App() {

  return (
    <>
      <Navbar bannerSrc={memoriaLogo} />
      <Login />
    </>
  )
}

export default App
