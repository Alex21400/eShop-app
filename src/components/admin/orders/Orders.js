import { useEffect, useState } from 'react'
import styles from './Orders.module.scss'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import { useDispatch } from 'react-redux'
import Loader from '../../loader/Loader'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
  const { data, isLoading } = useFetchCollection('orders')
  const [orders, setOrders] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setOrders(data)
  }, [data])

  const handleClick = (id) => {
  navigate(`/admin/order-details/${id}`)
  }
  
  return (
    <>
      <div className={styles.table}>
        <h2>Orders</h2>
        <p>Open an order to update order status</p>
        <br />
        <>
        {isLoading && <Loader />}
        <div className={styles.table}>
          {orders.length === 0 ? (
            <h3>No orders found!</h3>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Order Amount</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                 const  { id, orderDate, orderTime, orderAmount, orderStatus } = order

                 return (
                  <tr key={id} onClick={() => handleClick(id)}>
                    <td>{index + 1}</td>
                    <td>{orderDate} at {orderTime}</td>
                    <td>{id}</td>
                    <td><b>{`$${orderAmount}`}</b></td>
                    <td>
                      <p className={orderStatus !== 'Delivered' ? `${styles.pending}` : `${styles.delivered}`}>
                        {orderStatus}
                      </p>
                    </td>
                  </tr>
                 )
                })}
              </tbody>
            </table>
          )}
        </div>
        </>
      </div>
    </>
  )
}

export default Orders