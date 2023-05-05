import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/horizontalNav.css'
import logo from '../../assets/logo.png'
import SearchBar from '@mkyy/mui-search-bar';

function HorizontalNav() {


  return (
    <>
        <div className='horizontal-nav'>
            <img src={logo} alt="Logo" />         
            <SearchBar className='stylesSearchbar' placeholder="Buscar..." width="100%"/>
        </div>

    </>
  )
}

export default HorizontalNav