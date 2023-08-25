import Navbar from "../../components/header/Navbar"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Card, CardContent, Typography, Stack } from "@mui/material"
import DeleteButton from "../../components/DeleteButton"
import BackButton from "../../components/BackButton"
import StatusDialog from "../../components/StatusDialog"
import axiosInstance from "../../services/axiosInstance"
interface Post {
  id: number
  title: string
  body: string
  user?: {
    username: string
    email: string
  }
  userId: number
}
const PostDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>()
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogMessage, setDialogMessage] = useState("")
  const [dialogSuccess, setDialogSuccess] = useState(true)
  const getData = async (id: number) => {
    try {
      const db_url = "posts/db/post-with-user/"
      const response = await axiosInstance.get(db_url + id)
      setPost(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  

  const handleDelete = async (id: number) => {
    // const url = `https://jsonplaceholder.typicode.com/posts/${id}`
    const db_url = `posts/db/${id}`
    try {
      const response = await axiosInstance.delete(db_url)
      if (response.status === 200) {
        setDialogMessage("Post deleted successfully.")
        setDialogSuccess(true)
        setOpenDialog(true)
      }
    } catch (error) {
      console.error("Error deleteing post:", error)
      setDialogMessage("Error deleteing post. Please try again.")
      setDialogSuccess(false)
      setOpenDialog(true)
    }
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
    if (dialogSuccess) navigate("/posts")
  }

  useEffect(() => {
    getData(Number(id))
  }, [])

  if (!post) {
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
            Post ID: {post.id}
          </Typography>
          <Typography>Posted By userID: {post.userId}</Typography>
          {post.user && (
            <>
              <Typography>Posted By Username: {post.user.username}</Typography>
              <Typography>Email: {post.user.email}</Typography>
            </>
          )}
          <Typography variant="h5">{post.title}</Typography>
          <Typography style={{ marginTop: 10 }}>{post.body}</Typography>
        </CardContent>
      </Card>
      <div style={{ margin: "5%", display: "flex", justifyContent: "center" }}>
        <Stack spacing={2} direction="row">
          <DeleteButton id={post.id} handleDelete={handleDelete} />
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

export default PostDetail
