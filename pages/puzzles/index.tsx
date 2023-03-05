import { MainLayout } from '@/components/layout'
import { EnhancedTablePuzzle, FormDialog, VerticalBarChart } from '@/components/puzzles'
import { puzzleCells } from '@/constants'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Divider, Typography, Breadcrumbs, Link } from '@mui/material'
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
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary" variant="h6">
            Puzzles
          </Typography>
        </Breadcrumbs>
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
      <VerticalBarChart />
    </Box>
  )
}

CampaignsScreen.Layout = MainLayout

export default CampaignsScreen
