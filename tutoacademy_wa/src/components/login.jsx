
import '../styles/login.css'
import logo from '../assets/logo.png'
import background from '../assets/background.png'
import googleIcon from '../assets/googleIcon.png'
import { Link } from 'react-router-dom';

export function Login() {
  
  const styles = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    margin:0,
    padding:0,
    height:"100vh",
    width:"100vw"
  };

  return (

    <div style={styles}>
      <div className='lg-upperTitle'>
        <h2>Bienvenido a TUTO <span style={{ color: "#F09E00" }}>ACADEMY</span> </h2>
        <img src={logo} alt='logo' />
      </div>
      
      <div className='lg-title'>
        <h1>Inicio Sesión</h1>
          <Link to='/Home'>
          <button className="lg-button">
            <img src={googleIcon} alt='googleIcon' />
              Iniciar sesión con &nbsp; <span style={{ color: "#F09E00" }}>Google</span>
          </button>
          </Link>
      </div>
      <div className='lg-description'>
        <p>¡Bienvenido! Me alegra que estés interesado en conocer más sobre <br />
          Tuto academy web de tutorías académicas. <br /> <br />
          Nuestro sistema de tutorías académicas en línea es la solución perfecta <br />
          para aquellos que buscan mejorar sus habilidades académicas <br />de manera eficiente y personalizada.</p>
        
        

      </div>
    </div>

  )
 
}

export default Login;