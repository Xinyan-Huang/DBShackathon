import React from 'react';
import { Grid } from '@mui/material';
import { backgroundImage } from '../image';
const Page2 = () => {
  return (
    <Grid container sx={{
      height: '100vh',
      width: '100%',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    </Grid>
  );
};

export default Page2;