import { puzzleApi, searchApi } from '@/api-client'
import useSWR from 'swr'

export function usePuzzle() {
  const { data, error, mutate } = useSWR('/admin/puzzles', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function createPuzzle(payload: any, values: any) {
    await puzzleApi.create(payload)
    const x = {
      data: {
        puzzles: [...data.data.puzzles, values],
      },
    }
    await mutate(x, true)
  }

  async function updatePuzzle(payload: any, values: any) {
    await puzzleApi.update(payload)
    const item = data.data.puzzles.findIndex((obj: any) => obj._id === values._id)
    data.data.puzzles[item] = values
    const x = {
      data: {
        puzzles: data.data.puzzles,
      },
    }
    mutate(x, true)
  }

  async function searchPuzzle(payload: any) {
    const result = await searchApi.searchPuzzle(payload)
    mutate(result, false)
  }

  return {
    data,
    error,
    createPuzzle,
    updatePuzzle,
    searchPuzzle,
  }
}
