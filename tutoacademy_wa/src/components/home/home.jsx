
import VerticalNav from './verticalNav'
import HorizontalNav from './horizontalNav'
import '../../styles/home.css'
import { useAuthUser } from 'react-auth-kit';
import 'animate.css';
import {Calendar} from "./calendar"
import { GET_PROFILE_QUERY  } from '../../utilities/graphQl';
import {useQuery, useMutation,gql} from '@apollo/client';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export function Home() {

  //Get the authenticated user info
  const authUser=useAuthUser();
  const user=authUser();

  //Calling the query to verify if the profile is created
  const { data, loading, error } = useQuery(GET_PROFILE_QUERY, {
    variables: { id: user.googleId },
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  console.log(data.getProfile);
  if(data.getProfile){
    console.log("Si está el perfil");
  }else{
    console.log("No está el perfil")
  }
  
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