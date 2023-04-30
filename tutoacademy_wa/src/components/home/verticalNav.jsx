import React from 'react'
import { NavLink } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../../assets/logo.png'
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
            <img  src={user.imageUrl} alt="Logo" />
          </NavLink>

          <NavLink to="/home" className="nav-link">
            <DashboardIcon fontSize="large"/>
            <span>Inicio</span>
          </NavLink>

          <NavLink  className="nav-link">
            <AccountBoxIcon fontSize="large"/>
            <span>Perfil</span>
          </NavLink>

          <NavLink to="/calendar" className="nav-link">
            <EventNoteIcon fontSize="large"/>
            <span>Mis tutorias</span>
          </NavLink>

          <NavLink  className="nav-link">
            <ChatIcon fontSize="large"/>
            <span>Chats</span>
          </NavLink>
        </div>

        <div >

          <NavLink onClick={signOut} to="/" className="nav-link">
            <LogoutIcon fontSize="large"/>
            <span>Cerrar sesión</span>
          </NavLink>

        </div>

      </nav>
    </>
  )
}

export default verticalNav