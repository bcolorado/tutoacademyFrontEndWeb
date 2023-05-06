import React from 'react'
import { NavLink } from 'react-router-dom'
import { Dashboard, AccountBox, EventNote, Chat, Logout } from '@mui/icons-material';
import '../../styles/verticalNav.css'
import { useAuthUser, useSignOut } from 'react-auth-kit';
import 'animate.css';
import {useQuery} from '@apollo/client';
import { GET_PROFILE_QUERY  } from '../../utilities/graphql';

function verticalNav() {

  //Hook to sign out the user 
  const signOut=useSignOut();

  //Get the authenticated user info
  const authUser=useAuthUser();
  const user=authUser();

  //Calling the query to verify if the profile is created
  const { data, loading, error } = useQuery(GET_PROFILE_QUERY, {
    variables: { id: user.email },
  });


  let profileURL="";
  data?.getProfile===null ? profileURL="/createProfile":profileURL="/profile"

  return (
    <>
      <nav className='navbar'>

        <div>
          <NavLink  className="logo">
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

          <NavLink  className="nav-link">
            <Chat fontSize="large"/>
            <span>Chats</span>
          </NavLink>
        </div>

        <div >

          <NavLink onClick={signOut} to="/" className="nav-link">
            <Logout fontSize="large"/>
            <span>Cerrar sesión</span>
          </NavLink>

        </div>

      </nav>
    </>
  )
}

export default verticalNav