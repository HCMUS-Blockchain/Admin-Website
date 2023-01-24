import ArrowDownWardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

export function Item(item: any) {
  if (item.item.percentage > 0) {
    return (
      <>
        <Box bgcolor="rgba(0,128,0,0.2)" width="50px">
          <Typography color="#008000" fontWeight="bold" textAlign="center">
            {item.item.percentage}%
          </Typography>
        </Box>
        <ArrowUpwardIcon sx={{ color: '#008000' }} />
      </>
    )
  } else if (item.item.percentage === 0) {
    return (
      <Box bgcolor="rgb(128,128,128,0.2)" width="50px">
        <Typography fontWeight="bold" textAlign="center" color="rgb(128,128,128)">
          0%
        </Typography>
      </Box>
    )
  }
  return (
    <>
      <Box bgcolor="rgba(255,0,0,0.2)" width="50px">
        <Typography color="red" fontWeight="bold" textAlign="center">
          {item.item.percentage}%
        </Typography>
      </Box>
      <ArrowDownWardIcon sx={{ color: 'red' }} />
    </>
  )
}
