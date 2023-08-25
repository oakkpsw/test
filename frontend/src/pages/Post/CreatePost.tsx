import Navbar from "../../components/header/Navbar"
import { TextField, Button, Container, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import StatusDialog from "../../components/StatusDialog"
import { useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import axiosInstance from "../../services/axiosInstance"
interface PostForm {
  userId: number
  title: string
  body: string
}


const CreatePost = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<PostForm>()
  const [userId, setUser] = useState(0)

  const [openDialog, setOpenDialog] = useState(false)
  const [dialogMessage, setDialogMessage] = useState("")
  const [dialogSuccess, setDialogSuccess] = useState(true)

  const onSubmit: SubmitHandler<PostForm> = async (data) => {
    const db_url = "/posts/db/"
    try {
      data = { ...data, userId: userId }
      const response = await axiosInstance.post(db_url, data)

      if (response.status === 201) {
        setDialogMessage("Post created successfully.")
        setDialogSuccess(true)
        setOpenDialog(true)
      }
    } catch (error) {
      console.error("Error creating post:", error)
      setDialogMessage(`Error creating post. , Please try again.`)
      setDialogSuccess(false)
      setOpenDialog(true)
    }
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
    if (dialogSuccess) navigate("/posts")
  }
  const getUserId = () => {
    const userId = localStorage.getItem("userId")
    if (userId) {
      setUser(JSON.parse(userId))
    }
  }

  useEffect(() => {
    getUserId()
  }, [])

  return (
    <>
      <Navbar />
      <div style={{ margin: "3%" }}></div>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Create Post
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
     
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("title")}
            required
          />
          <TextField
            label="Body"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            {...register("body")}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Create Post
          </Button>
        </form>
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

export default CreatePost
