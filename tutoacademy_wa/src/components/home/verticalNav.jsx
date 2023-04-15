import React from 'react'
import { NavLink } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../../assets/logo.png'
import '../../styles/verticalNav.css'

function verticalNav() {
  return (
    <>
      <nav className='navbar'>

        <div>
          <NavLink to="/" className="logo">
            <img src={logo} alt="Logo" />
          </NavLink>

          <NavLink to="/" className="nav-link">
            <DashboardIcon fontSize="large"/>
            <span>Inicio</span>
          </NavLink>

          <NavLink to="/" className="nav-link">
            <AccountBoxIcon fontSize="large"/>
            <span>Perfil</span>
          </NavLink>

          <NavLink to="/" className="nav-link">
            <EventNoteIcon fontSize="large"/>
            <span>Mis tutorias</span>
          </NavLink>

          <NavLink to="/" className="nav-link">
            <ChatIcon fontSize="large"/>
            <span>Chats</span>
          </NavLink>
        </div>

        <div >

          <NavLink to="/" className="nav-link">
            <LogoutIcon fontSize="large"/>
            <span>Cerrar sesión</span>
          </NavLink>

        </div>

      </nav>
    </>
  )
}

export default verticalNav