import Navbar from "../../components/header/Navbar"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Card, CardContent, Typography, Stack } from "@mui/material"
import DeleteButton from "../../components/DeleteButton"
import BackButton from "../../components/BackButton"
import StatusDialog from "../../components/StatusDialog"
import axiosInstance from "../../services/axiosInstance"

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address?: {
    city: string
    street: string
    suite: string
    zipcode: string
  }
  company?: {
    name: string
  }
}

const UsersDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, setUser] = useState<User | null>()
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogMessage, setDialogMessage] = useState("")
  const [dialogSuccess, setDialogSuccess] = useState(true)
  const getData = async (id: number) => {
    try {
      const db_url = "/users/db/"
      const response = await axiosInstance.get(db_url + id)
      setUser(response.data)
    } catch (error) {
        console.log(error)
    }
  }

  const handleDelete = async (id: number) => {
    // const url = `https://jsonplaceholder.typicode.com/posts/${id}`
    const db_url = `/users/db/${id}`
    try {
      const response = await axiosInstance.delete(db_url)
      if (response.status === 200) {
        setDialogMessage("User deleted successfully.")
        setDialogSuccess(true)
        setOpenDialog(true)
        //  navigate('/posts')
      }
    } catch (error) {
      setDialogMessage("Error deleteing post. Please try again.")
      setDialogSuccess(false)
      setOpenDialog(true)
    }
    //  console.log(data)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
    if (dialogSuccess) navigate("/users")
  }

  useEffect(() => {
    getData(Number(id))
  }, [])

  if (!user) {
    return (
      <>
        <Navbar />
        <Typography>Loading...</Typography>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div style={{ margin: "3%" }}></div>
      <Card
        style={{ maxWidth: 1080, margin: "auto", marginTop: 20, padding: 10 }}
      >
        <CardContent>
          <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
            User ID: {user.id}
          </Typography>
          <Typography>Name: {user.name}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Phone: {user.phone}</Typography>
          <Typography>Username: {user.username}</Typography>
          <Typography>Website: {user.website}</Typography>
          {user.address && (
            <>
              <Typography>
                Address: {user.address.city} {user.address.street}{" "}
                {user.address.suite} {user.address.zipcode}
              </Typography>
            </>
          )}
          {user.company && (
            <>
              <Typography>Company: {user.company.name}</Typography>
            </>
          )}
        </CardContent>
      </Card>
      <div style={{ margin: "5%", display: "flex", justifyContent: "center" }}>
        <Stack spacing={2} direction="row">
          <DeleteButton id={user.id} handleDelete={handleDelete} />
          <BackButton />
        </Stack>
      </div>
      <StatusDialog
        open={openDialog}
        onClose={handleCloseDialog}
        success={dialogSuccess}
        message={dialogMessage}
      />
    </>
  )
}

export default UsersDetail
