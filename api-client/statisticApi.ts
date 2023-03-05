import axiosClient from './axiosClient'

export const statisticApi = {
  getGeneralStatistics(option: string) {
    return axiosClient.get(`/admin/statistics/${option}`)
  },
  getVoucherStatistic(payload: any) {
    return axiosClient.post('/admin/statistics/voucher', payload)
  },
  getUserStatistic(payload: any) {
    return axiosClient.post('/admin/statistics/user', payload)
  },
  getCounterpartStatistic(payload: any) {
    return axiosClient.post('/admin/statistics/counterpart', payload)
  },
  getGameStatistic() {
    return axiosClient.get('/admin/statistics/game')
  },
  getStatisticCampaign(payload: any) {
    return axiosClient.post('/admin/statistics/campaign', payload)
  },
  getStatisticPuzzle(payload: any) {
    return axiosClient.post('/admin/statistics/puzzle', payload)
  },
}
