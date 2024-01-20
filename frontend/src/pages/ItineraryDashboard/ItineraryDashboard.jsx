import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Grid, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';
import { useAuth } from '../../Auth';
import { backgroundImage, loginImage } from '../image';
const Account = () => {
  const jwtToken = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transferData, setTransferData] = useState({ senderAccount: '', receiverAccount: '', value: 0 });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [budget, setBudget] = useState(0);
  const [destination, setDestination] = useState([]);
  const [itinerary, setItinerary] = useState({userId: '', title:'', countryId:'', budget: 0, destinationId:[]});
  const [destinationChoices, setDestinationChoices] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');


  const countryList = [
    {id:1, name:"Singapore"},
    {id:2, name:"Hong Kong"}
  ];

  let countryName = '';

  // countryList.forEach(element => {
  //   console.log(element.name);
  // });

  // Function to fetch account data
  const fetchAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/getAccount', {
        headers: {
          'Authorization': `Bearer ${jwtToken}` // Assuming a Bearer token, modify as needed
        }
      });
      setAccounts(response.data);
      console.log(response)
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };
  // Function to transfer data
  const handleTransferClick = (account) => {
    setTransferData({ ...transferData, senderAccount: account.accountNumber });
    setIsDialogOpen(true);
  };

  // const handleCreateItinerary = (account) => {
  //   setItinerary({ ...itinerary, userId: account.accountNumber });
  //   setIsDialogOpen(true);
  // };

  const handleSelectedCountry = (event) => {
    setSelectedCountry = (event.target.value);
  }
  const selectDestination = (country) => {
    setCountry(country.value);
    console.log(country);
    // const response = await axios.get('http://localhost:5001/destination/countryId')
  }

  const handleTransfer = async () => {
    try {
      console.log(transferData)
      const response = await axios.put('http://localhost:5001/transfer', transferData, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });

      if (response.status === 200) {
        setIsDialogOpen(false);
        setTransferData({ senderAccount: '', receiverAccount: '', value: 0 });
        setOpenSnackbar(true)
        setTimeout(() => {
          setOpenSnackbar(false); // Optionally hide alert after some time
        }, 3000);
        fetchAccounts();
      } else {
        setError('Transfer failed');
      }
    } catch (error) {
      setError('Transfer failed: ' + error.message);
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setError('');
  };


  useEffect(() => {
    fetchAccounts();
  }, []);

  const columns = [
    {
      accessorKey: 'accountType',
      header: 'Account Type',
    },
    {
      accessorKey: 'accountNumber',
      header: 'Account Number',
    },
    {
      accessorKey: 'balance',
      header: 'Balance',
    },
    {
      id: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <Button
          variant="contained"
          onClick={() => handleTransferClick(row.original)}
          size="small"
        >
          Transfer
        </Button>
      ),
    },
  ];

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
      <Grid item xs={8} sx={{}}>
        <MaterialReactTable
          columns={columns}
          data={accounts}
          renderTopToolbarCustomActions={() => (
            <Grid item xs={12} sx={{ pt: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ ml: 1, display: "flex", alignItems: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Accounts
                </Typography>
              </Box>
            </Grid>
          )}
        />
      </Grid>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle>Create Itinerary</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={transferData.receiverAccount}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="country"
            label="Country"
            type="text"
            fullWidth
            variant="outlined"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <TextField
            margin="dense"
            id="budget"
            label="Budget"
            type="number"
            fullWidth
            variant="outlined"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleTransfer}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: theme => theme.zIndex.tooltip }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Itinerary successfully created!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Account;