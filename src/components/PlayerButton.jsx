import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function PlayerButton({ id, name }) {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/player/${id}`);
  };

  return (
    <Button
      variant="outlined"
      fullWidth
      onClick={handleOnClick}
      sx={{
        textAlign: 'left',
        padding: '10px',
        margin: '2px 0',
        borderRadius: '4px',
        justifyContent: 'flex-start',
        textTransform: 'none', // Prevents uppercase transformation
        color: 'black', // Sets the text color to black
        borderColor: 'white', // Optionally set border color to black if using outlined variant
        '&:hover': {
          borderColor: 'black', // Maintains border color on hover
        },
      }}
    >
      {name}
    </Button>
  );
}

export default PlayerButton;
