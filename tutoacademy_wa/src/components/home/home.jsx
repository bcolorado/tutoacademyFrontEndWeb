
import VerticalNav from './verticalNav'
import HorizontalNav from './horizontalNav'
import '../../styles/home.css'

export function Home() {

  
  return (
  <>   
    <div className='principal'>
      <VerticalNav/>
      <HorizontalNav/>
      <div className='title'>
        <h1>Inicio</h1>
        <h3>Bienvenido a Tuto academy</h3>
      </div>
    </div>

  </>
  );
}

export default Home;