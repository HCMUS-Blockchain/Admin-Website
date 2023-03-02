import axiosClientFile from './axiosClientFile'

export const puzzleApi = {
  create(payload: any) {
    return axiosClientFile.post('/admin/puzzles', payload)
  },
  update(payload: any) {
    return axiosClientFile.put('/admin/puzzles', payload)
  },
}
