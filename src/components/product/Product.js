import { useEffect, useState } from 'react'
import styles from './Product.module.scss'
import ProductFilter from './productFilter/ProductFilter'
import ProductList from './productList/ProductList'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_PRODUCTS, GET_PRICE_RANGE } from '../../redux/slice/productSlice'
import loaderImg from '../../assets/loader.gif'
import { FaCogs } from 'react-icons/fa'

const Product = () => {
  const { data, isLoading } = useFetchCollection('products')

  const { products } = useSelector(state => state.product)

  const [showFilter, setShowFilter] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(STORE_PRODUCTS({
      products: data
    }))
  }, [dispatch, data])
  
  useEffect(() => {
    dispatch(GET_PRICE_RANGE({products: data }))
  }, [dispatch, data])

  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }

  return (
    <section>
        <div className={`container ${styles.product}`}>
            <aside className={showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`}>
              {isLoading ? null : <ProductFilter />}         
            </aside>
            <div className={styles.content}>
              {isLoading ? (
                <img src={loaderImg} alt='Loading...' style={{ width: '100px' }} className='--center-all' />
              ) : (
                <ProductList products={products} />
              )}
              <div className={styles.icon} onClick={toggleFilter}>
                <FaCogs size={24} color='#e8743f' />
                <p><b>{showFilter ? 'Hide Filters' : 'Show Filters'}</b></p>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Product