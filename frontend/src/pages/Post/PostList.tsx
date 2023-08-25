import React, { useState, useEffect } from "react"
import { Typography, Container, Toolbar } from "@mui/material"
import Navbar from "../../components/header/Navbar"
import CreateButton from "../../components/CreateButton"
import DataGrid from "../../components/DataGrid"
import Paging from "../../components/Paging"
import { useNavigate } from "react-router-dom"
import axiosInstance
 from "../../services/axiosInstance"
const PostList = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 20
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const navigate = useNavigate()
  const getData = async () => {
    try {
      // const url = "https://jsonplaceholder.typicode.com/posts"
      const db_url = "/posts/db/"
      const response = await axiosInstance.get(db_url)
      setPosts(response.data)
    } catch (error) {
      console.log(error)
    } 
  }
  useEffect(() => {
    getData()
  }, [])

 

  const handleView = (id: number) => {
    navigate(`/posts/${id}`)
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value)
  }

  

  if (!posts) {
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
          <Typography variant="h4">ALL Post</Typography>
          <CreateButton link="/posts/create-post" title="post" />
        </Toolbar>
        <DataGrid
          datas={currentPosts}
          handleView={handleView}
        />

        <Paging
          dataLength={posts.length}
          dataPerPage={postsPerPage}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Container>
    </>
  )
}

export default PostList
