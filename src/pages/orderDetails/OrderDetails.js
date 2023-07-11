import React, { useEffect, useState } from 'react'
import styles from './OrderDetails.module.scss'
import { useParams, Link } from 'react-router-dom'
import useFetchDocument from '../../customHooks/useFetchDocument'
import loaderImg from '../../assets/loader.gif'

const OrderDetails = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const { document } = useFetchDocument('orders', id)

  useEffect(() => {
    setOrder(document)
  }, [document])

  console.log(order)

  return (
    <section>
      <div className={`container ${styles.table}`}> 
        <h2>Order Details</h2>
        <div>
          <Link to='/order-history'>&larr; Back to Order History</Link>
        </div>
        <br />
        {order === null ? (
          <img src={loaderImg} alt="Loading..." style={{ width: '100px'}} />
        ) : (
          <>
            <p>
              <b>Order ID</b> {order.id}
            </p>
            <p>
              <b>Order Amount</b> {order.orderAmount}
            </p>
            <p>
              <b>Order Status</b> {order.status}
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cartItem, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cartItem

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img src={imageURL} alt={name} style={{ width: '100px'}} />
                      </td>
                      <td className={styles.price}>${price}</td>
                      <td>{cartQuantity}</td>
                      <td className={styles.total}>${(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <Link to={`/review-product/${id}`}>
                          <button className='--btn --btn-primary'>Review Product</button>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  )
}

export default OrderDetails