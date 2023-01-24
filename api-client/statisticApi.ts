import axiosClient from './axiosClient'

export const statisticApi = {
  getGeneralStatistics(option: string) {
    return axiosClient.get(`/admin/statistics/${option}`)
  },
}
