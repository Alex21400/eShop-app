import { useState } from 'react'
import styles from './ChangeOrderStatus.module.scss'
import Loader from '../../loader/Loader'
import Card from '../../card/Card'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../firebase/Config'
import { toast } from 'react-toastify'

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const editOrder = (e, id) => {
    e.preventDefault()
    setIsLoading(true)

    const orderConfig = {
      userID: order.userID,
      email: order.email,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAdress: order.shippingAdress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate()
    }
    
    try {
      setDoc(doc(db, 'orders', id), orderConfig)
      setIsLoading(false)
      toast.success('Order status updated')
      navigate('/admin/orders')
    }catch(error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <>
    {isLoading && <Loader />}
    <div className={styles.status}>
      <Card cardClass={styles.card}>
        <h4>Update Status</h4>
        <form onSubmit={(e) => editOrder(e, id)}>
          <span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value='' disabled>--Select One--</option>
              <option value="Processing...">Processing...</option>
              <option value="Order placed...">Order placed...</option>
              <option value="Shipped...">Shipped...</option>
              <option value="Delivered">Delivered</option>
            </select>
          </span>
          <span>
            <button type='submit' className='--btn --btn-primary'>Update Status</button>
          </span>
        </form>
      </Card>
    </div>
    </>
  )
}

export default ChangeOrderStatus