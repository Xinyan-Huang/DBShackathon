import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Grid, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Input } from "@mui/material"
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';
import { useAuth } from '../../Auth';
import { backgroundImage, loginImage } from '../image';
const DestinationDashboardPage = () => {
  const jwtToken = useAuth();
  const [isDialogOpenDelete, setIsDialogOpenDelete] = useState(false);
  const [isDialogOpenEdit, setIsDialogOpenEdit] = useState(false);
  const [isDialogOpenCreate, setIsDialogOpenCreate] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbarDelete, setOpenSnackbarDelete] = useState(false);
  const [openSnackbarEdit, setOpenSnackbarEdit] = useState(false);
  const [openSnackbarCreate, setOpenSnackbarCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [createDestination, setCreateDestination] = useState({ country_id: '', name: '', budget: 0, notes: '' });
  const [editDestination, setEditDestination] = useState({ countryId: '', name: '', budget: 0, notes: '' });
  const [destinationResult, setDestinationResult] = useState([]);

  // Function to fetch DestinationDashboardPage data

  useEffect(() => {
    axios.get("http://localhost:5001/destination", {
      headers: {
        Authorization: `Bearer ${jwtToken}` // Assuming a Bearer token, modify as needed
      }
    }).then((res) => {
      setDestinationResult(res.data);
    })
  }, [])

  const handleCreateDestination = async () => {
    console.log(createDestination)
    await axios.post("http://localhost:5001/destination", createDestination).then((res) => {
      console.log(res);
    })
  }

  const handleDeleteDestination = (id) => {
    console.log(id)
    axios.delete(`http://localhost:5001/destination/${id}`).then((res) => {
      console.log(res);
      
    })
  }

  const handleTransfer = () => {
    console.log("123");
  }


  const handleDeleteClose = () => {
    setIsDialogOpenDelete(false);
    setError('');
  };

  const handleEditClick = () => {
    setIsDialogOpenEdit(true)
  }
  const handleEditClose = () => {
    setIsDialogOpenEdit(false);
    setError('');
  };

  const handleCreateClose = () => {
    
    setOpenCreate(false);
    setError('');
  };

  const handleCreate = () => {
    // axios.post("http://localhost:5001/destination", ).then((res) => {
    //   setDestinationResult(res.data);
    // })
    setOpenCreate(true)
    setError('');
  }

  const columns = [
    {
      accessorKey: 'name',
      header: 'Destination',
    },
    {
      accessorKey: 'cost',
      header: 'Cost',
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
    },
    {
      id: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <Grid container>
          <Grid item xs={6} padding={1}>
            <Button
              variant="contained"
              onClick={() => handleDeleteDestination(row.original.id)}
              size="small"
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={6} padding={1}>
            <Button
              variant="contained"
              onClick={() => handleEditClick(row.original.name)}
              size="small"
            >
              Edit
            </Button>
          </Grid>
        </Grid>
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
          data={destinationResult}
          renderTopToolbarCustomActions={() => (
            <Grid item xs={12} sx={{ pt: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ ml: 1, display: "flex", alignItems: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Destination
                </Typography>
              </Box>
              <Button onClick={() => handleCreate()}>
                Create new destination
              </Button>
            </Grid>
          )}
        />
      </Grid>

      <Dialog open={openCreate} onClose={handleCreateClose}>
        <DialogTitle>Create Destination</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="country_id"
            label="Country ID"
            type="text"
            fullWidth
            variant="outlined"
            value={createDestination.countryId}
            onChange={(e) => setCreateDestination({ ...createDestination, country_id: e.target.value })}
          />
          <TextField
            margin="dense"
            id="name"
            label="Destination Name"
            type="text"
            fullWidth
            variant="outlined"
            value={createDestination.name}
            onChange={(e) => setCreateDestination({ ...createDestination, name: e.target.value })}
          />
          <TextField
            margin="dense"
            id="budget"
            label="Budget"
            type="number"
            fullWidth
            variant="outlined"
            value={createDestination.budget}
            onChange={(e) => setCreateDestination({ ...createDestination, budget: parseFloat(e.target.value) || 0 })}
          />
          <TextField
            margin="dense"
            id="notes"
            label="Notes"
            type="text"
            fullWidth
            variant="outlined"
            value={createDestination.notes}
            onChange={(e) => setCreateDestination({ ...createDestination, notes: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleTransfer}>Edit</Button>
        </DialogActions>
      </Dialog>
      {/* <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }} sx={{ zIndex: theme => theme.zIndex.tooltip }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          Transfer successfully!
        </Alert>
      </Snackbar> */}
    </Grid>
  )
}

export default DestinationDashboardPage;
