import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useStatisticGame } from '@/hooks/useStatisticGame'

ChartJS.register(ArcElement, Tooltip, Legend)
export function DoughnutChart() {
  const { data: games } = useStatisticGame()
  const [data, setData] = useState({
    labels: ['2048', 'Fly', 'Shake', 'Quiz'],
    datasets: [
      {
        label: 'Total turns',
        data: [0, 0, 0, 0],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  })

  useEffect(() => {
    if (games) {
      const x = games.data.result
      const datasets = [
        {
          label: 'Total turns',
          data: x,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ]
      setData({ labels: ['2048', 'Fly', 'Shake', 'Quiz'], datasets: datasets })
    }
  }, [games])
  return <Doughnut data={data} width="450" />
}
