import { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material"
import Navbar from "../../components/header/Navbar"
import StatusDialog from "../../components/StatusDialog"
import { useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import axiosInstance from "../../services/axiosInstance"
interface UserForm {
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  company: {
    company_name: string
    catchPhrase: string
    bs: string
  }
  password: string
}
const CreateUsers = () => {
  //   const [formData, setFormData] = useState();

  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<UserForm>()
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogMessage, setDialogMessage] = useState("")
  const [dialogSuccess, setDialogSuccess] = useState(true)


  const onSubmit: SubmitHandler<UserForm> = async (data) => {
    const db_url = "/users/db/"
    try {
      const response = await axiosInstance.post(db_url, data)

      if (response.status === 201) {
        setDialogMessage("User created successfully.")
        setDialogSuccess(true)
        setOpenDialog(true)
      }
    } catch (error) {
      setDialogMessage(
        `Error creating user, Please try again.`
      )
      setDialogSuccess(false)
      setOpenDialog(true)
    }
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
    if (dialogSuccess) navigate("/users")
  }



  return (
    <>
      <Navbar />
      <div style={{ margin: "3%" }}></div>
      <Card style={{ maxWidth: 600, margin: "auto", marginTop: 20 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Create User
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  {...register("name")}
                  //   onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  {...register("username")}
                  //   onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="password"
                  type="password"
                  {...register("password")}
                  //   onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  {...register("email")}
                  fullWidth
                  required
                  type="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  {...register("phone")}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Website"
                  {...register("website")}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Address
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Street"
                  {...register("address.street")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Suite"
                  {...register("address.suite")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  {...register("address.city")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Zipcode"
                  {...register("address.zipcode")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Latitude"
                  {...register("address.geo.lat")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Longitude"
                  {...register("address.geo.lng")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Company
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Company Name"
                  {...register("company.company_name")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Catch Phrase"
                  {...register("company.catchPhrase")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField label="BS" {...register("company.bs")} fullWidth />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ margin: "5%" }}
            >
              Create User
            </Button>
          </form>
        </CardContent>
      </Card>
      <StatusDialog
        open={openDialog}
        onClose={handleCloseDialog}
        success={dialogSuccess}
        message={dialogMessage}
      />
    </>
  )
}

export default CreateUsers
