import React, { useEffect, useState } from "react"
import { MaterialReactTable } from "material-react-table"
import { Grid, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import axios from "axios"
import { Snackbar, Alert } from "@mui/material"
import { useAuth } from "../../Auth"
import { backgroundImage, loginImage } from "../image"
const Account = () => {
  const jwtToken = useAuth()
  const [accounts, setAccounts] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [transferData, setTransferData] = useState({ senderAccount: "", receiverAccount: "", value: 0 })
  const [error, setError] = useState("")
  const [openSnackbar, setOpenSnackbar] = useState(false)

  // Function to fetch account data
  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:5001/getAccount", {
        headers: {
          Authorization: `Bearer ${jwtToken}` // Assuming a Bearer token, modify as needed
        }
      })
      setAccounts(response.data)
      console.log(response)
    } catch (error) {
      console.error("Error fetching accounts:", error)
    }
  }
  // Function to transfer data
  const handleTransferClick = account => {
    setTransferData({ ...transferData, senderAccount: account.accountNumber })
    setIsDialogOpen(true)
  }

  const handleTransfer = async () => {
    try {
      console.log(transferData)
      const response = await axios.put("http://localhost:5001/transfer", transferData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })

      if (response.status === 200) {
        setIsDialogOpen(false)
        setTransferData({ senderAccount: "", receiverAccount: "", value: 0 })
        setOpenSnackbar(true)
        setTimeout(() => {
          setOpenSnackbar(false) // Optionally hide alert after some time
        }, 3000)
        fetchAccounts()
      } else {
        setError("Transfer failed")
      }
    } catch (error) {
      setError("Transfer failed: " + error.message)
    }
  }

  const handleClose = () => {
    setIsDialogOpen(false)
    setError("")
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  const columns = [
    {
      accessorKey: "title",
      header: "Title"
    },
    {
      accessorKey: "budget",
      header: "Budget"
    },
    {
      accessorKey: "country_id",
      header: "Country Name"
    },
    {
      id: "actions",
      header: "",
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
            <Button variant="contained" onClick={() => handleTransferClick(row.original)} size="small">
              Edit
            </Button>
          </Grid>
        </Grid>
      )
    }
  ]

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Grid item xs={8} sx={{}}>
        <MaterialReactTable
          columns={columns}
          data={accounts}
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
        <DialogTitle>Edit Itinerary</DialogTitle>
        <DialogContent>
          <Grid container spacing={12}>
            {/* Left column content */}
            <Grid item xs={12} md={12} style={{ paddingRight: "32px" }}>
              <TextField
                autoFocus
                margin="dense"
                name="App_Acronym"
                label="Title"
                type="text"
                fullWidth
                style={{ marginBottom: "16px" }}
                value={transferData.receiverAccount}
                // value={newAppData.App_Acronym}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="group-select-label-${appData.username}">Choose Country</InputLabel>
                <Select labelId="group-select-label-${appData.username}" name="App_permit_Open" value={transferData.receiverAccount || ""}>
                  {/* {Array.isArray(countryOptions) &&
                        countryOptions.map(opt => (
                          <MenuItem key={opt} value={opt}>
                            {opt}
                          </MenuItem>
                        ))} */}
                </Select>
              </FormControl>
              <TextField
                margin="dense"
                name="App_Rnumber"
                label="Budget"
                type="number"
                fullWidth
                value={transferData.receiverAccount}
                // value={newAppData.App_Rnumber}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="group-select-label-${appData.username}">Choose Destination</InputLabel>
                <Select labelId="group-select-label-${appData.username}" name="App_permit_Open" value={transferData.receiverAccount || ""}>
                  {/* {Array.isArray(groupOptions) &&
                        groupOptions.map(opt => (
                          <MenuItem key={opt} value={opt}>
                            {opt}
                          </MenuItem>
                        ))} */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleTransfer}>Edit</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }} sx={{ zIndex: theme => theme.zIndex.tooltip }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          Transfer successfully!
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default Account
