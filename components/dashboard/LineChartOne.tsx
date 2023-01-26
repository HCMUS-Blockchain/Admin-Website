import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Voucher',
    },
  },
}

export interface LineChartOneInterface {
  dayOfTheYear: Array<any>
  user: Array<number>
}

export function LineChartOne({ dayOfTheYear, user }: LineChartOneInterface) {
  const [data, setData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Total Users Which Participated In',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  })

  useEffect(() => {
    if (dayOfTheYear) {
      setData({ ...data, labels: dayOfTheYear })
    }
  }, [dayOfTheYear])

  useEffect(() => {
    if (user) {
      const datasets = [
        {
          label: 'Total Users Which Participated In',
          data: user,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ]

      setData({ ...data, datasets: datasets })
    }
  }, [user])
  return <Line options={options} data={data} />
}
