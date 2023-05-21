import VerticalNav from './verticalNav'
import HorizontalNav from './horizontalNav'
import '../../styles/home.css'
import { useAuthUser } from 'react-auth-kit';
import 'animate.css';
import {Calendar} from "./calendar"
import { GET_PROFILE_QUERY  } from '../../utilities/graphQl';
import {useQuery, useMutation,gql} from '@apollo/client';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { NewtonsCradle } from '@uiball/loaders'

export function Home() {

  //Get the authenticated user info
  const authUser=useAuthUser();
  const user=authUser();

  //Calling the query to verify if the profile is created
  const { data, loading, error, refetch} = useQuery(GET_PROFILE_QUERY, {
    variables: { id: user.googleId },
  });

  // Use the useLocation hook to get the current location
  const location = useLocation();

  // Use the useEffect hook to re-render Home when the location changes
  useEffect(() => {
    // Render Home again
    refetch()
    // console.log('Rendering Home again...');
  }, [location]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <NewtonsCradle size={80} speed={0.8} color="black" />
      </div>
    );
  }
  if (error) return <p>Error :</p>;


  
  return (
  <>   
    <div className='principal'>
      <VerticalNav/>
      <HorizontalNav/>
      <div className='title'>
        <h1 className='animate__animated animate__flipInX'>Inicio</h1>
        <h3 className='animate__animated animate__flipInX '>Bienvenido {user && user.givenName ? user.givenName : ''} a Tuto academy</h3>
      </div>
      {
        data?.getProfile===null ? <Link to="/createProfile">
                                    <button className='pfl-button'>¡Crea tu perfil!</button>
                                  </Link> :<></>
      }
      <div className='schedule'>
        <Calendar/>
      </div>
    </div>

  </>
  );
}

export default Home;
