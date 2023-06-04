import React from 'react'
import { NavLink } from 'react-router-dom'
import { Dashboard, AccountBox, EventNote, Chat, Logout } from '@mui/icons-material';
import '../../styles/verticalNav.css'
import { useAuthUser, useSignOut } from 'react-auth-kit';
import 'animate.css';
import {useQuery} from '@apollo/client';
import { GET_PROFILE_QUERY  } from '../../utilities/graphQl';

function verticalNav() {

  //Hook to sign out the user 
  const signOut=useSignOut();

  //Get the authenticated user info
  const authUser=useAuthUser();
  const user=authUser();

  //Calling the query to verify if the profile is created
  const { data, loading, error } = useQuery(GET_PROFILE_QUERY, {
    variables: { id: user.googleId },
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const handleSignOut = () => {
    // Eliminar el token de acceso del Local Storage
    localStorage.removeItem("accessToken");
    // Cerrar la sesión del usuario
    signOut();
  };



  let profileURL="";
  data?.getProfile===null ? profileURL="/createProfile":profileURL=`/profile/${user?.googleId}`

  return (
    <>
      <nav className='navbar'>

        <div>
          <NavLink to={profileURL}  className="logo">
            <img  src={user.imageUrl} alt="Logo" referrerPolicy="no-referrer" />
          </NavLink>

          <NavLink to="/home" className="nav-link">
            <Dashboard fontSize="large"/>
            <span>Inicio</span>
          </NavLink>

          <NavLink to={profileURL} className="nav-link">
            <AccountBox fontSize="large"/>
            <span>Perfil</span>
          </NavLink>

          <NavLink to="/calendar" className="nav-link">
            <EventNote fontSize="large"/>
            <span>Mis tutorias</span>
          </NavLink>
          {
            data?.getProfile===null ? <></>:
            <NavLink  to='/chats' className="nav-link">
            <Chat fontSize="large"/>
            <span>Chats</span>
          </NavLink>
          }
          
        </div>

        <div >

          <NavLink onClick={handleSignOut} to="/" className="nav-link">
            <Logout fontSize="large"/>
            <span>Cerrar sesión</span>
          </NavLink>

        </div>

      </nav>
    </>
  )
}

export default verticalNav