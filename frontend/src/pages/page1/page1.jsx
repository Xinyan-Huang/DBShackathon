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
  const [createDestination, setCreateDestination] = useState({ countryId: '', name: '', budget: 0, notes: '' });
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

  const handleEditClick = () => {
    setIsDialogOpenEdit(true)
  }
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
              <Button onClick={() => setOpenCreate(true)}>
                Create new destination
              </Button>
            </Grid>
          )}
        />
      </Grid>
      <Dialog open={isDialogOpenEdit} onClose={() => setIsDialogOpenEdit(false)}>
        <DialogTitle>Edit Destinations</DialogTitle>
        <DialogContent>
          <Grid container spacing={12}>
            {/* Left column content */}
            <Grid item xs={12} md={12} style={{ paddingRight: "32px" }}>
              <TextField
                autoFocus
                margin="dense"
                name="Country"
                label="Country"
                type="text"
                fullWidth
                style={{ marginBottom: "16px" }}
                value={destinationResult.country_id}
                disabled
              // value={newAppData.App_Acronym}
              />
              <Input
                margin="dense"
                name="Destination_Name"
                label="Destination Name"
                type="number"
                fullWidth
                value={destinationResult.name}
              // value={newAppData.App_Rnumber}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="group-select-label-${destinationResult.name}">Choose Destination</InputLabel>
                <Select labelId="group-select-label-${destinationResult.name}" name="App_permit_Open" value={destinationResult.country_id || ""}>
                  {/* {Array.isArray(groupOptions) &&
                        groupOptions.map(opt => (
                          <MenuItem key={opt} value={opt}>
                            {opt}
                          </MenuItem>
                        ))} */}
                </Select>
              </FormControl>
              <TextField
                margin="dense"
                name="App_Description"
                label="Notes"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={destinationResult.notes || ""}
              // onChange={e => handleChange("App_Description", e.target.value)}
              />
            </Grid>
          </Grid>
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
