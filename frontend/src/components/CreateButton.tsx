import { Button } from "@mui/material"
import { Link } from "react-router-dom"
interface CreateButtonProps {
  title: string
  link: string
}
const CreateButton = ({ title, link }: CreateButtonProps) => {
  return (
    <>
      <Link to={link} key={title} style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary">
          Create {title}
        </Button>
      </Link>
    </>
  )
}

export default CreateButton
