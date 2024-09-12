// Home page is just going to hold a search bar component

import React from 'react';
import PlayerSearchBar from '../components/PlayerSearchBar';

const section = {
  display: 'grid',
  placeItems: 'center',
  alignContent: 'center',
  padding: '25px 0',
  height: '50vh'
}

const Home = () => {
  
  return (
    <div style={section}>
      <PlayerSearchBar/>
    </div>
  );
};

export default Home;