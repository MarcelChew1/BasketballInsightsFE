import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import PlayerSearchBar from '../components/PlayerSearchBar';

const Home = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Search for an NBA player
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 600, mt: 2 }}>
        <PlayerSearchBar />
      </Box>
    </Container>
  );
};

export default Home;
