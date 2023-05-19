import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/horizontalNav.css';
import logo from '../../assets/logo.png';
import SearchBar from '@mkyy/mui-search-bar';
import { useQuery } from '@apollo/client';
import { FIND_PROFILE_QUERY } from '../../utilities/graphQl';
import { ProfileResult } from './profileResult';

function HorizontalNav() {
  const [searchValue, setSearchValue] = useState('');
  const [firstRender, setFirstRender] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const { data, loading, error } = useQuery(FIND_PROFILE_QUERY, { variables: { value: searchValue } });
  const searchRef = useRef(null);

  const search = (value) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else if (data) {
      setSearchResults(data.findProfiles);
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchValue('');
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
      <div ref={searchRef} className="search-results">
        {data &&
          data.findProfiles &&
          searchResults &&
          searchResults.map((data) => (
            <div key={data?.userID.googleId} style={{ marginBottom: '10px', width: '400px' }}>
              <ProfileResult data={data} />
            </div>
          ))}
      </div>
    </>
  );
}

export default HorizontalNav;
