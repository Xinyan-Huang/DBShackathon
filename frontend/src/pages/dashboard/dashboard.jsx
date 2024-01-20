import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Grid, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';
import { useAuth } from '../../Auth';
import { backgroundImage, loginImage } from '../image';
const Dashboard = () => {
//   const jwtToken = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [transferData, setTransferData] = useState({ senderAccount: '', receiverAccount: '', value: 0 });
//   const [error, setError] = useState('');
//   const [openSnackbar, setOpenSnackbar] = useState(false);
const [destinations, setDestinations] = useState([]);

  // Function to fetch account data
  const fetchItineraries = async () => {
    const { data } = await axios.get(`http://localhost:8000/Itineraries/`);
    return data;
}  

const deleteItinerary = async (id) => {
    const { data } = await axios.delete(`http://localhost:8000/Itineraries/${id}`);
    return data;
}  


const fetchDestinations = async () => {
    const { data } = await axios.get(`http://localhost:8000/Destinations/`);
    return data;
}  

const handleEdit = () => {
    setIsDialogOpen(true)
}
// Function to transfer data
//   const handleTransferClick = (account) => {
//     setTransferData({ ...transferData, senderAccount: account.accountNumber });
//     setIsDialogOpen(true);
//   };

//   const handleTransfer = async () => {
//     try {
//       console.log(transferData)
//       const response = await axios.put('http://localhost:5001/transfer', transferData, {
//         headers: {
//           'Authorization': `Bearer ${jwtToken}`
//         }
//       });

//       if (response.status === 200) {
//         setIsDialogOpen(false);
//         setTransferData({ senderAccount: '', receiverAccount: '', value: 0 });
//         setOpenSnackbar(true)
//         setTimeout(() => {
//           setOpenSnackbar(false); // Optionally hide alert after some time
//         }, 3000);
//         fetchAccounts();
//       } else {
//         setError('Transfer failed');
//       }
//     } catch (error) {
//       setError('Transfer failed: ' + error.message);
//     }
//   };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = (id) => {
    console.log("sent in id ", id)
    deleteItinerary()
    .then((res) => {
        setItineraries(itineraries.filter((iti) => iti.id == id))


console.log(res)
    })


    
    
  }

useEffect(() => {
    fetchItineraries()
      .then((res) => {
        setItineraries(res);
        console.log(res)

  
      })
      .catch((er) => console.log(er));



  }, []);
  
  const columns = [
    {
        accessorKey: 'id',
        header: 'Itinerary ID',
      },
  
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'budget',
      header: 'Budget',
    },
    {
        accessorKey: 'country',
        header: 'Country',
      },
  
    {
        accessorKey: 'destinations',
        header: 'destinations',
      },
      {
        id: 'edit',
        header: 'Edit',
        Cell: ({ row }) => (
          <Button
            variant="contained"
            onClick={() => handleEdit(row.original.id)}
            size="small"
          >
            Edit
          </Button>
        ),
      },
      {
        id: 'delete',
        header: 'Delete',
        Cell: ({ row }) => (
          <Button
            variant="contained"
            onClick={() => handleDelete(row.original)}
            size="small"
          >
            Delete
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
      <Grid item xs={10} sx={{}}>
        <MaterialReactTable
          columns={columns}
          data={itineraries}
          renderTopToolbarCustomActions={() => (
            <Grid item xs={12} sx={{ pt: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ ml: 1, display: "flex", alignItems: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Dashboard
                </Typography>
              </Box>
            </Grid>
          )}
        />
      </Grid>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <p>hello</p>
      </Dialog>
      {/* <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle>Transfer Funds</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="receiverAccount"
            label="Receiver Account"
            type="text"
            fullWidth
            variant="outlined"
            value={transferData.receiverAccount}
            onChange={(e) => setTransferData({ ...transferData, receiverAccount: e.target.value })}
          />
          <TextField
            margin="dense"
            id="value"
            label="Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={transferData.value}
            onChange={(e) => {
              const newValue = parseInt(e.target.value, 10);
              setTransferData({ ...transferData, value: newValue });
            }}
          />
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleTransfer}>Transfer</Button>
        </DialogActions>
      </Dialog> */}
      {/* <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: theme => theme.zIndex.tooltip }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Transfer successfully!
        </Alert>
      </Snackbar> */}
    </Grid>
  );
};

export default Dashboard;