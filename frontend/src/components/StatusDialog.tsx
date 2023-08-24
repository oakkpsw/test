import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material"

interface StatusDialogProps {
  open: boolean
  onClose: () => void
  success: boolean
  message: string
}

const StatusDialog = ({
  open,
  onClose,
  success,
  message,
}: StatusDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{success ? "Success" : "Error"}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StatusDialog
