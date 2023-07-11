import { useState, useEffect } from 'react'
import styles from './OrderDetails.module.scss'
import useFetchDocument from '../../../customHooks/useFetchDocument'
import loaderImg from '../../../assets/loader.gif'
import { Link, useParams } from 'react-router-dom'
import ChangeOrderStatus from '../changeOrderStatus/ChangeOrderStatus'

const AdminOrderDetails = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)

  const { document } = useFetchDocument('orders', id)
  console.log(order)

  useEffect(() => {
    setOrder(document)
  }, [document])

  return (
    <>
      <div className={styles.table}> 
        <h2>Order Details</h2>
        <div>
          <Link to='/admin/orders'>&larr; Back to Orders</Link>
        </div>
        <br />
        {order === null ? (
          <img src={loaderImg} alt="Loading..." style={{ width: '100px'}} />
        ) : (
          <>
            <p>
              <b>Order ID:</b> {order.id}
            </p>
            <p>
              <b>Order Amount:</b> {order.orderAmount}
            </p>
            <p>
              <b>Order Status:</b> {order.orderStatus}
            </p>
            <p>
              <b>Shipping Adress:</b> 
              <br />
              {order.shippingAdress.line1},
              {order.shippingAdress.line2}, {order.shippingAdress.city}
              <br />
              {order.shippingAdress.state}
              <br />
              {order.shippingAdress.country}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cartItem, index) => {
                  const { name, price, imageURL, cartQuantity } = cartItem

                  return (
                    <tr key={index}>
                      <td>
                        <p>{index + 1}</p>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img src={imageURL} alt={name} style={{ width: '100px'}} />
                      </td>
                      <td>
                        <p className={styles.price}>${price}</p>
                      </td>
                      <td>
                        <p>{cartQuantity}</p>
                      </td>
                      <td>
                        <p className={styles.price}>${(price * cartQuantity).toFixed(2)}</p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <ChangeOrderStatus order={order} id={id} />
          </>
        )}
      </div>
    </>
  )
}

export default AdminOrderDetails