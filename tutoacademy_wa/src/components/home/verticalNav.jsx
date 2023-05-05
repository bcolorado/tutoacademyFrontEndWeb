import React from 'react'
import { NavLink } from 'react-router-dom'
import { Dashboard, AccountBox, EventNote, Chat, Logout } from '@mui/icons-material';
import '../../styles/verticalNav.css'
import { useAuthUser, useSignOut } from 'react-auth-kit';
import 'animate.css';

function verticalNav() {
  const signOut=useSignOut();

  const authUser=useAuthUser();
  const user=authUser();

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

          <NavLink  className="nav-link">
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