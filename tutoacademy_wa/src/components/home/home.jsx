
import VerticalNav from './verticalNav'
import HorizontalNav from './horizontalNav'
import '../../styles/home.css'
import { useAuthUser } from 'react-auth-kit';
import 'animate.css';
import {Calendar} from "./calendar"

export function Home() {
  const authUser=useAuthUser();
  const user=authUser();
  
  return (
  <>   
    <div className='principal'>
      <VerticalNav/>
      <HorizontalNav/>
      <div className='title'>
        <h1 className='animate__animated animate__flipInX'>Inicio</h1>
        <h3 className='animate__animated animate__flipInX '>Bienvenido {user && user.givenName ? user.givenName : ''} a Tuto academy</h3>
      </div>
      <div className='schedule'>
        <Calendar/>
      </div>
    </div>

  </>
  );
}

export default Home;