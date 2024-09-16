import React, { useState } from 'react';
import axios from 'axios';
import { TextField, CircularProgress, Box, Paper } from '@mui/material';
import PlayerButton from './PlayerButton';

const PlayerSearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 1) {
      setLoading(true);
      try {
        const response = await axios.get('https://basketballinsightsbe-ccec99c2ec8f.herokuapp.com/search', {
          params: { q: e.target.value }
        });
        setSuggestions(response.data); // Assuming response.data is an array of suggestions
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
      <TextField
        fullWidth
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        placeholder="Search players..."
        sx={{ marginBottom: 2 }}
      />
      {loading && <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />}
      {suggestions.length > 0 && (
        <Paper sx={{ maxHeight: 300, overflowY: 'auto' }}>
          {suggestions.map(([id, name], index) => (
            <PlayerButton id={id} name={name} index={index}/>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default PlayerSearchBar;
