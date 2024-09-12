import React from 'react';
import { useNavigate } from 'react-router-dom';

function PlayerButton({id, name, index}) {
  const navigate = useNavigate(); 
  const handleOnClick = () => {
    navigate(`/player/${id}`);
  }
  return (
    <button
      key={index}
      onClick={() => handleOnClick(name)}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        padding: '10px',
        margin: '2px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      {name}
    </button>

  );
}

export default PlayerButton;