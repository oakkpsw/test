import React, { useState, useEffect } from "react"
import { Typography, Container, Toolbar } from "@mui/material"
import Navbar from "../../components/header/Navbar"
import CreateButton from "../../components/CreateButton"
import DataGrid from "../../components/DataGrid"
import Paging from "../../components/Paging"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../services/axiosInstance"

interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
}


const UsersList = () => {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 8
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
  const navigate = useNavigate()
  const getData = async () => {
    try {
      // setLoading(true)
      // const url = "https://jsonplaceholder.typicode.com/users"
      const db_url = "/users/db/"
      const response = await axiosInstance.get(db_url)
      const transformedResponse = response.data.map((user: UserData) => ({
        id: user.id,
        title: user.name,
        body: `username: ${user.username} email: ${user.email}`,
      }))

      setUsers(transformedResponse)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  const handleView = (id: number) => {
    navigate(`/users/${id}`)
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value)
  }
  if (!users) {
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
      <Container maxWidth="xl">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">ALL Users</Typography>
          <CreateButton link="/users/create-user" title="user" />
        </Toolbar>
        <DataGrid datas={currentUsers} handleView={handleView} />

        <Paging
          dataLength={users.length}
          dataPerPage={usersPerPage}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Container>
    </>
  )
}

export default UsersList
