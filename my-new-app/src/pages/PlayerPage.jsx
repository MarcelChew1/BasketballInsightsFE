import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, Grid, Paper, CircularProgress, Alert, Box } from '@mui/material';
import PlayerInfoTable from '../components/PlayerInfoTable';
import PlayerInfoButton from '../components/PlayerInfoButton';
import PlayerStatChart from '../components/PlayStatChart';

function PlayerPage() {
  const { playerId } = useParams(); // Get playerId from the URL
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerTable, setPlayerTable] = useState(null);
  const [tableType, setTableType] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://basketballinsightsbe-ccec99c2ec8f.herokuapp.com/player/${playerId}`);
        setPlayerData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [playerId]);

  const getPlayerInfo = async (field) => {
    try {
      const response = await axios.get(`https://basketballinsightsbe-ccec99c2ec8f.herokuapp.com/player/${playerId}/${field}`);
      console.log(response.data);
      setPlayerTable(response.data);
      setTableType(field);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Alert severity="error">Error: {error.message}</Alert></Box>;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
      <Container maxWidth="xl">
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Player: {playerData.Name}
          </Typography>
          <Typography variant="body1" align="center">Position: {playerData.Position}</Typography>
          {playerData.FormerNames && (
            <Typography variant="body1" align="center">Former Names: {playerData.FormerNames}</Typography>
          )}
          <Typography variant="body1" align="center">Nicknames: {playerData.Nicknames}</Typography>
          <Typography variant="body1" align="center">DOB: {playerData.DOB}</Typography>
          <Typography variant="body1" align="center">Height: {playerData.Height}</Typography>
          <Typography variant="body1" align="center">Weight: {playerData.Weight}</Typography>

          <Grid container spacing={2} justifyContent="center" mt={3}>
            {['Totals', 'Adjusted Shooting', 'Advanced', 'Highs', 'Individual Game Data', 'Per Game', 'Per 36 Minutes', 'Per Possession', 'Playoffs'].map((field) => (
              <Grid item xs={12} sm={6} md={4} key={field}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => getPlayerInfo(field)}
                >
                  {field}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {playerTable && (
          <Box mb={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <PlayerInfoTable table={playerTable} />
            </Paper>
          </Box>
        )}

        {playerTable && (
          <Box mb={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <PlayerStatChart data={playerTable} type={tableType} />
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default PlayerPage;
