import React, { useState } from 'react';
import axios from 'axios';
import PlayerButton  from './PlayerButton';
function PlayerSearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 1) {
      try {
        const response = await axios.get(`https://basketballinsightsbe-ccec99c2ec8f.herokuapp.com//search`, {
          params: { q: e.target.value }
        });
        setSuggestions(response.data); // Assuming response.data is an array of suggestions
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };
  

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search players..."
      />
      <div>
        {suggestions.map(([id, name], index) => (
          <PlayerButton id={id} name={name} index={index}/>
        ))}
      </div>
    </div>
  );
}

export default PlayerSearchBar;