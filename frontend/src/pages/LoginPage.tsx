import { useState } from "react"
import { TextField, Button, Typography, Container, Box } from "@mui/material"
import Navbar from "../components/header/Navbar"
import { useForm, SubmitHandler } from "react-hook-form"
import StatusDialog from "../components/StatusDialog"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../services/axiosInstance"
interface LoginForm {
  email: string
  password: string
}

const LoginPage = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<LoginForm>()
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogMessage, setDialogMessage] = useState("")
  const [dialogSuccess, setDialogSuccess] = useState(true)

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const db_url = "/auth/login"
    try {
      const response = await axiosInstance.post(db_url, data)

      if (response.status === 201) {
        console.log("Login successfully:", response.data)
        localStorage.setItem("token", JSON.stringify(response.data))

        // get profile
        const url_profile = "/auth/profile"
        const response_profile = await axiosInstance.get(url_profile, {
          headers: {
            Authorization: `Bearer ${response.data.accessToken}`,
          },
        })
        localStorage.setItem(
          "profile",
          JSON.stringify(response_profile.data.username)
        )
        localStorage.setItem(
          "userId",
          JSON.stringify(response_profile.data.id)
        )
        setDialogMessage("Login successfully.")
        setDialogSuccess(true)
        setOpenDialog(true)

      }
    } catch (error) {
      console.error("Error Login :", error)
      setDialogMessage(
        `Error Login email or password wrong Please try again.`
      )
      setDialogSuccess(false)
      setOpenDialog(true)
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    if (dialogSuccess) navigate("/posts")
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box mt={8}>
          <Typography variant="h4" align="center">
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="email"
              variant="outlined"
              fullWidth
              margin="normal"
              //   value={credentials.username}
              {...register("email")}
              //   onChange={(e) =>
              //     setCredentials({ ...credentials, username: e.target.value })
              //   }
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              //   value={credentials.password}
              {...register("password")}
              //   onChange={(e) =>
              //     setCredentials({ ...credentials, password: e.target.value })
              //   }
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </Box>
      </Container>
      <StatusDialog
        open={openDialog}
        onClose={handleCloseDialog}
        success={dialogSuccess}
        message={dialogMessage}
      />
    </>
  )
}

export default LoginPage
