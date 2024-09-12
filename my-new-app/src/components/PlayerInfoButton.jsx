import React from 'react';
import Button from '@mui/material/Button';

const PlayerInfoButton = ({ field, getPlayerInfo }) => {
  return (
    <Button variant="contained" color="primary" onClick={() => getPlayerInfo(field)}>
      {field}
    </Button>
  );
};

export default PlayerInfoButton;
