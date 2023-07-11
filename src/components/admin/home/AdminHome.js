import React, { useEffect, useState } from 'react'
import styles from './AdminHome.module.scss'
import InfoBox from '../../infoBox/InfoBox'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillDollarCircle } from 'react-icons/ai'
import { FaCartArrowDown, FaClipboardList } from 'react-icons/fa'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import { CALCULATE_TOTAL_ORDER_AMOUNT } from '../../../redux/slice/orderSlice'
import Chart from '../../chart/Chart'

// Icons
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />
const productsIcon = <FaCartArrowDown size={30} color='#1f93ff' />
const ordersIcon = <FaClipboardList size={30} color='#e8743f' />

const AdminHome = () => {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])

  const productsCollection = useFetchCollection('products')
  const ordersCollection = useFetchCollection('orders')
  const { totalOrderAmount } = useSelector(state => state.order)

  const dispatch = useDispatch()

  useEffect(() => {
    setProducts(productsCollection.data)
    setOrders(ordersCollection.data)

    dispatch(CALCULATE_TOTAL_ORDER_AMOUNT())
  }, [dispatch, productsCollection, ordersCollection])

  return (
    <div className={styles.home}>
        <h2>Home</h2>
        <div className={styles['info-box']}>
            <InfoBox cardClass={`${styles.card} ${styles.card1}`}
            title={'Earnings'}
            count={`$${totalOrderAmount}`}
            icon={earningIcon} /> 

            <InfoBox cardClass={`${styles.card} ${styles.card2}`}
            title={'Products'}
            count={products.length}
            icon={productsIcon} />

            <InfoBox cardClass={`${styles.card} ${styles.card3}`}
            title={'Orders'}
            count={orders.length}
            icon={ordersIcon} />
        </div>
        <div className={styles.chart}>
          <Chart />
        </div>
    </div>
  )
}

export default AdminHome