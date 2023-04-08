
import './styles/App.css'
import logo from './assets/logo.png'
import googleIcon from './assets/googleIcon.png'

function App() {
  return (

    <>
    <div className='lg-upperTitle'>
      <h2>Bienvenido a TUTO <span style={{ color: "#F09E00" }}>ACADEMY</span> <img src={logo} alt='logo' /> </h2>
      
    </div>


    <div className='lg-title'>
      <h1>Inicio Sesión</h1>
      <button className="lg-button">
      <img src={googleIcon} alt='googleIcon' />
        Iniciar sesión con &nbsp; <span style={{ color: "#F09E00" }}>Google</span></button>
      
    </div>
    <div className='lg-description'>
      <p>¡Bienvenido! Me alegra que estés interesado en conocer más sobre <br />
         Tuto academy web de tutorías académicas. <br /> <br />
         Nuestro sistema de tutorías académicas en línea es la solución perfecta para aquellos que buscan mejorar sus habilidades académicas de manera eficiente y personalizada.</p>
      
      

    </div>
    </>

  )
 
}

export default App
