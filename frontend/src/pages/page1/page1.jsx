import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Auth';
import { Grid, Box, Typography } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { backgroundImage } from '../image';
const Page1 = () => {
  const jwtToken = useAuth();
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5001/dashboard/3', { // Replace with your correct endpoint
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };
  const columns = [
    { accessorKey: 'recordId', header: 'Record Id' },
    { accessorKey: 'item1', header: 'Item 1' },
    { accessorKey: 'item2', header: 'Item 2' },
    { accessorKey: 'item3', header: 'Item 3' },
    { accessorKey: 'item4', header: 'Item 4' },
    { accessorKey: 'email', header: 'Email' },
    // ... other columns as per your dashboard data structure
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

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
      <Grid item xs={8}>
        <MaterialReactTable
          columns={columns}
          data={dashboardData}
          renderTopToolbarCustomActions={() => (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Dashboard
              </Typography>
            </Box>
          )}
        />
      </Grid>
    </Grid>
  );
};

export default Page1;