import { Typography } from '@mui/material'
export interface TypoItemInterface {
  item: any
  option: string
}
export function TypoItem({ item, option }: TypoItemInterface) {
  if (item.percentage > 0) {
    return (
      <Typography fontSize="small" color="rgb(128,128,128)">
        {item.percentage}% more than last {option}
      </Typography>
    )
  } else if (item.percentage < 0) {
    return (
      <Typography fontSize="small" color="rgb(128,128,128)">
        {item.percentage}% less than last {option}
      </Typography>
    )
  }
  return (
    <Typography fontSize="small" color="rgb(128,128,128)">
      Data is not changed than the last {option}
    </Typography>
  )
}
