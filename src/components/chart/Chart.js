import React from 'react'
import styles from './Chart.module.scss'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Card from '../card/Card';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

const Chart = () => {
  const orders = useSelector(state => state.order.orderHistory)
  
  // Create a new array of order status
  const statusArray = []
  orders.forEach(order => {
    const { orderStatus } = order

    statusArray.push(orderStatus)
  })

  const getOrderCount = (array, value) => {
    return array.filter(item => item === value).length
  }

  const placed = getOrderCount(statusArray, 'Order placed...')
  const processing = getOrderCount(statusArray, 'Processing...')
  const shipped = getOrderCount(statusArray, 'Shipped...')
  const delivered = getOrderCount(statusArray, 'Delivered')

  const data = {
    labels: ["Placed", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: 'Orders Count',
        data: [placed, processing, shipped, delivered],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };

  return (
    <div className={styles.chart}>
      <Card cardClass={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  )
}

export default Chart