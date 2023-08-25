import Navbar from "../components/header/Navbar"
import { useEffect, useState } from "react"
import { Card, CardContent, Typography, Stack } from "@mui/material"
import BackButton from "../components/BackButton"
import axiosInstance from "../services/axiosInstance"

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

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>()

  const getData = async (userId: number) => {
    try {
      const db_url = "/users/db/"
      const response = await axiosInstance.get(db_url + userId)
      setUser(response.data)
    } catch (error) {
        console.log(error)
    }
  }
  const getUserId = () => {
    const userId = localStorage.getItem("userId")
    if (userId) {
      getData(Number(userId))
    }
  }
  useEffect(() => {
    getUserId()
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
          <BackButton />
        </Stack>
      </div>
    </>
  )
}

export default ProfilePage
