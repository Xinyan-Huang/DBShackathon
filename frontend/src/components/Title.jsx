import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Title = ({ title }) => {
  return (
    <Box sx={{
      backgroundColor: 'white',
      padding: '10px 10px',
      textAlign: 'center',
      width: '100%',
    }}>
      <Typography variant="h3" component="h1" sx={{ 
          margin: 0, 
          color: '#232323',
      }}>
        {title}
      </Typography>
    </Box>
  );
};

export default Title;