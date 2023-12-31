import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const BackButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      onClick={() => navigate(-1)}
      variant="contained"
    >
      Back{" "}
    </Button>
  )
}

export default BackButton
