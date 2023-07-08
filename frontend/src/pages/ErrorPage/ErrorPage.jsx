import React from 'react';
import { Box, Button, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
export default function Error() {
    const navigate = useNavigate();

    const handleBackHome = () => {
      navigate('/');
    };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5', 
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Box textAlign="center" >
            <Box display="flex" justifyContent="center" >
              <img
                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
              <Button variant="contained" onClick={handleBackHome}>
                Back Home
              </Button>
            </Box>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  );
}
