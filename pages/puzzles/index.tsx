import { MainLayout } from '@/components/layout'
import { EnhancedTablePuzzle, FormDialog, VerticalBarChart } from '@/components/puzzles'
import { puzzleCells } from '@/constants'
import { usePuzzle } from '@/hooks'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Divider, Typography, Breadcrumbs, Link } from '@mui/material'
import { useEffect, useState } from 'react'

export interface CampaignsScreenProps {}

function CampaignsScreen(props: CampaignsScreenProps) {
  const [open, setOpen] = useState(false)
  const [disable, setDisable] = useState(false)
  const openDialog = () => {
    setOpen(true)
  }
  const { data } = usePuzzle()
  useEffect(() => {
    if (data) {
      for (let i = 0; i < data.data.puzzles.length; i++) {
        console.log(data.data.puzzles[i])
        if (data.data.puzzles[i].status === 'HAPPENING') {
          setDisable(true)
        }
      }
    }
  }, [data])
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
          disabled={disable}
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
