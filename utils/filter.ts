import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import dayjs from 'dayjs'

export function CheckQuantity(condition: string, data: any, value: string) {
  if (condition === 'Greater than') {
    return data.filter((item: any) => item.remainingVoucher > parseInt(value))
  } else if (condition === 'Greater than or equal to') {
    return data.filter((item: any) => item.remainingVoucher >= parseInt(value))
  } else if (condition === 'Less than') {
    return data.filter((item: any) => item.remainingVoucher < parseInt(value))
  } else if (condition === 'Less than or equal to') {
    return data.filter((item: any) => item.remainingVoucher <= parseInt(value))
  }
}

export function CheckStartDate(condition: string, data: any, value: string) {
  if (condition === 'Greater than') {
    return data.filter((item: any) => dayjs(item.dateBegin).isAfter(dayjs(value)))
  } else if (condition === 'Greater than or equal to') {
    dayjs.extend(isSameOrAfter)
    return data.filter((item: any) => dayjs(item.dateBegin).isSameOrAfter(dayjs(value)))
  } else if (condition === 'Less than') {
    return data.filter((item: any) => dayjs(item.dateBegin).isBefore(dayjs(value)))
  } else if (condition === 'Less than or equal to') {
    dayjs.extend(isSameOrBefore)
    return data.filter((item: any) => dayjs(item.dateBegin).isSameOrBefore(dayjs(value)))
  }
}

export function CheckEndDate(condition: string, data: any, value: string) {
  if (condition === 'Greater than') {
    return data.filter((item: any) => dayjs(item.dateEnd).isAfter(dayjs(value)))
  } else if (condition === 'Greater than or equal to') {
    dayjs.extend(isSameOrAfter)
    return data.filter((item: any) => dayjs(item.dateEnd).isSameOrAfter(dayjs(value)))
  } else if (condition === 'Less than') {
    return data.filter((item: any) => dayjs(item.dateEnd).isBefore(dayjs(value)))
  } else if (condition === 'Less than or equal to') {
    dayjs.extend(isSameOrBefore)
    return data.filter((item: any) => dayjs(item.dateEnd).isSameOrBefore(dayjs(value)))
  }
}

export function filterString(condition: string, data: any, value: string, field: string) {
  console.log(data)
  if (condition === 'Equals') {
    return data.filter((item: any) => item[`${field}`] === value)
  } else if (condition === 'Contains') {
    return data.filter((item: any) => item[`${field}`].includes(value))
  } else if (condition === 'Starts with') {
    return data.filter((item: any) => item[`${field}`].startsWith(value))
  } else if (condition === 'Ends with') {
    return data.filter((item: any) => item[`${field}`].endsWith(value))
  }
}
