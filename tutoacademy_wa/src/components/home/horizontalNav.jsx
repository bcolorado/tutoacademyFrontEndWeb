import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/horizontalNav.css';
import logo from '../../assets/logo.png';
import SearchBar from '@mkyy/mui-search-bar';
import { useQuery } from '@apollo/client';
import { FIND_PROFILE_QUERY } from '../../utilities/graphQl';

function HorizontalNav() {
  const [searchValue, setSearchValue] = useState('');
  const [firstRender, setFirstRender] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const { data, loading, error } = useQuery(FIND_PROFILE_QUERY, { variables: { value: searchValue } });

  const search = (value) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (firstRender && data ) {setFirstRender(false);} // No haga nada
    else if (!firstRender && data ) {
      setSearchResults(data.findProfiles);
      console.log(data.findProfiles)
    } 

  }, [data]);

  return (
    <>
      <div className="horizontal-nav">
        <img src={logo} alt="Logo" />
        <SearchBar
          className="stylesSearchbar"
          placeholder="Buscar..."
          width="100%"
          onChange={search}
          onFocus={search}
        />
      </div>
    </>
  );
}

export default HorizontalNav;
