import { MainLayout } from '@/components/layout'
import { EnhancedTablePuzzle, FormDialog } from '@/components/puzzles'
import { puzzleCells } from '@/constants'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Divider, Typography } from '@mui/material'
import { useState } from 'react'

export interface CampaignsScreenProps {}

function CampaignsScreen(props: CampaignsScreenProps) {
  const [open, setOpen] = useState(false)
  const openDialog = () => {
    setOpen(true)
  }
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography component="h2" variant="h5">
          Puzzles
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => openDialog()}
        >
          Create
        </Button>
      </Box>
      <Divider />
      <EnhancedTablePuzzle headCells={puzzleCells} />
      <FormDialog open={open} setOpen={setOpen} dataDialog={null} />
    </Box>
  )
}

CampaignsScreen.Layout = MainLayout

export default CampaignsScreen
