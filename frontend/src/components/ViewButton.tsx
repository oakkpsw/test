import { Button } from '@mui/material'

interface ViewProps {
    id:number
    handleView:(id: number) => void
}

const ViewButton = ({handleView , id}: ViewProps) => {
  return (
    <>
    <Button onClick={() => handleView(id)} variant="outlined" color="primary">
      View {" "}
    </Button>
    </>
  )
}

export default ViewButton