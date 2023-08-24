import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import ViewButton from "./ViewButton"

interface MediaProps {
  title: string
  body: string
  id: number
  handleDelete?: (id: number) => void
  handleView: (id: number) => void
}


const MediaCard = ({ body, title, id, handleView }: MediaProps) => {
  return (
    <Card sx={{ maxWidth: 1024, height: "100%" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <ViewButton handleView={handleView} id={id} />
        {/* <DeleteButton handleDelete={handleDelete} id={id} /> */}
      </CardActions>
    </Card>
  )
}

export default MediaCard
