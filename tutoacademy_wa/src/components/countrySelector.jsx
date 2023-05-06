import React from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import "../styles/createProfile.css"

export const CountrySelector = () => {
  const [country, setCountry] = React.useState('');

  return (
    <div>
      <CountryDropdown
        defaultOptionLabel='Selecciona un país'
        value={country}
        onChange={(val) => setCountry(val)} />
    </div>
  );
}

export default  CountrySelector


