import React from 'react'
import { Stack,Pagination } from '@mui/material'

interface PagingProps {
  dataLength: number
  dataPerPage: number
  currentPage: number
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void
}
const Paging = ({ dataLength, dataPerPage , currentPage , handlePageChange }:PagingProps) => {
  return (
    <div style={{ margin: "5%", display: "flex", justifyContent: "center" }}>
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(dataLength / dataPerPage)}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  )
}

export default Paging