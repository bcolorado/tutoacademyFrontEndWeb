
import VerticalNav from './verticalNav'
import HorizontalNav from './horizontalNav'
import '../../styles/home.css'
import { useAuthUser } from 'react-auth-kit';

export function Home() {
  const authUser=useAuthUser();
  const user=authUser();
  
  return (
  <>   
    <div className='principal'>
      <VerticalNav/>
      <HorizontalNav/>
      <div className='title'>
        <h1>Inicio</h1>
        <h3>Bienvenido {user && user.givenName ? user.givenName : ''} a Tuto academy</h3>
      </div>
    </div>

  </>
  );
}

export default Home;