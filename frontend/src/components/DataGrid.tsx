import { Grid } from "@mui/material"
import MediaCard from "./MediaCard" // Import your MediaCard component

// Define the PostGrid interface
interface Data {
  id: number
  title: string
  body: string
}

interface DataListProps {
  datas: Data[]
  handleDelete?: (id: number) => void
  handleView: (id:number) => void
}
        
const DataGrid = ({ datas, handleDelete, handleView }: DataListProps) => {
  return (
    <Grid container spacing={4}>
      {datas.map((data) => (
        <Grid item xs={12} sm={6} md={3} key={data.id}>
          <MediaCard
            body={data.body}
            title={data.title}
            handleDelete={handleDelete}
            handleView={handleView}
            id = {data.id}
          ></MediaCard>
        </Grid>
      ))}
      
    </Grid>
  )
}

export default DataGrid
