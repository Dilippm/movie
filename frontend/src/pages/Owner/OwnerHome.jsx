import React, { lazy, Suspense } from 'react';
import { Grid, Typography } from '@mui/material';

const Cards = lazy(() => import('../../components/OwnerDashBoard/Cards'));
const LineDemo = lazy(() => import('../../components/OwnerDashBoard/Charts/Line'));
const BasicDemo = lazy(() => import('../../components/OwnerDashBoard/Charts/Bar'));
const DoughnutChartDemo = lazy(() => import('../../components/OwnerDashBoard/Charts/Dognut'));

const OwnerHome = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div style={{ height: '25vh', marginTop: '30px' }}>
          <Suspense fallback={<div>Loading Cards...</div>}>
            <Cards />
          </Suspense>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div
              style={{
                background: '#e1e1e1',
                height: '600px',
                marginLeft: '40px',
                border: '1px solid white',
                boxShadow: '0 2px 10px rgba(0, 0.6, 0, 0.5)',
              }}
            >
              <Typography variant="h5" component="div" mt={8} pl={4} style={{ marginTop: '10px' }}>
                <b>Revenue Chart</b>
              </Typography>
              <Suspense fallback={<div>Loading LineDemo...</div>}>
                <LineDemo />
              </Suspense>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div
              style={{
                background: '#e1e1e1',
                height: '600px',
                marginRight: '40px',
                border: '1px solid white',
                boxShadow: '0 2px 10px rgba(0, 0.6, 0, 0.5)',
              }}
            >
              <Typography variant="h5" component="div" mt={8} pl={4} style={{ marginTop: '10px' }}>
                <b>Movie Chart</b>
              </Typography>
              <Suspense fallback={<div>Loading DoughnutChartDemo...</div>}>
                <DoughnutChartDemo />
              </Suspense>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div
              style={{
                background: '#e1e1e1',
                height: '65vh',
                marginLeft: '40px',
                marginBottom: '40px',
                border: '1px solid white',
                boxShadow: '0 2px 10px rgba(0, 0.6, 0, 0.5)',
              }}
            >
              <Typography variant="h5" component="div" mt={8} pl={4} mb={4} style={{ marginTop: '10px' }}>
                <b>Theater Chart</b>
              </Typography>
              <Suspense fallback={<div>Loading BasicDemo...</div>}>
                <BasicDemo />
              </Suspense>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OwnerHome;
