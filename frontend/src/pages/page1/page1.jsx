import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Grid, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
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
  const [createDestination, setCreateDestination] = useState({ countryId: '', name: '', budget: 0, notes: '' });
  const [editDestination, setEditDestination] = useState({ countryId: '', name: '', budget: 0, notes: '' });
  const [destinationResult, setDestinationResult] = useState([]);

  // Function to fetch DestinationDashboardPage data

  useEffect(() => {
    axios.get("http://localhost:5001/destination").then((res) => {
      setDestinationResult(res.data);
    })
  }, [])

  const handleCreateDestination = () => {
    console.log("zxc");
  }

  const handleTransfer = () => {
    console.log("123");
  }


  const handleDeleteClose = () => {
    setIsDialogOpenDelete(false);
    setError('');
  };

  const handleEditClose = () => {
    setIsDialogOpenEdit(false);
    setError('');
  };

  const handleCreateClose = () => {
    setIsDialogOpenCreate(false);
    setError('');
  };

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
              // onClick={() => handleTransferClick(row.original)}
              size="small"
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={6} padding={1}>
            <Button
              variant="contained"
              // onClick={() => handleTransferClick(row.original)}
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
              <Button onClick={() => setOpenCreate(true)}>
                Create new destination
              </Button>
            </Grid>
          )}
        />
      </Grid>

      <Dialog open={isDialogOpenCreate} onClose={handleCreateClose}>
        <DialogTitle>Create Destination</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="countryId"
            label="Country ID"
            type="text"
            fullWidth
            variant="outlined"
            value={createDestination.countryId}
            onChange={(e) => setCreateDestination({ ...createDestination, countryId: e.target.value })}
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
          <Button onClick={handleCreateClose}>Cancel</Button>
          <Button onClick={handleCreateDestination}>Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogOpenDelete} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Delete Destination?</DialogTitle>
        <DialogContent>
          <Button
            variant="contained"
            // onClick={() => handleTransferClick(row.original)}
            size="small"
          >
            Delete
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleTransfer}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbarEdit}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbarEdit(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: theme => theme.zIndex.tooltip }}
      >
        <Alert onClose={() => setOpenSnackbarEdit(false)} severity="success" sx={{ width: '100%' }}>
          Edited successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackbarDelete}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbarDelete(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: theme => theme.zIndex.tooltip }}
      >
        <Alert onClose={() => setOpenSnackbarDelete(false)} severity="success" sx={{ width: '100%' }}>
          Deleted successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackbarCreate}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbarCreate(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: theme => theme.zIndex.tooltip }}
      >
        <Alert onClose={() => setOpenSnackbarCreate(false)} severity="success" sx={{ width: '100%' }}>
          Created successfully!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default DestinationDashboardPage;