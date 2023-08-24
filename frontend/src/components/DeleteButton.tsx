import { Button } from "@mui/material"
import ConfirmationDialog from "./ConfirmationDialog"
import { useState } from "react"
interface DeleteProps {
  id: number
  handleDelete: (id: number) => void
}
const DeleteButton = ({ handleDelete ,id }: DeleteProps) => {
  const [open, setOpen] = useState(false)

  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  const confirmDelete = () => {
    handleDelete(id)
    closeDialog()
  }
  return (
    <>
      <Button onClick={openDialog} variant="outlined" color="error">
        Delete{" "}
      </Button>
      <ConfirmationDialog
        open={open}
        onClose={closeDialog}
        onConfirm={confirmDelete}
      />
    </>
  )
}

export default DeleteButton
