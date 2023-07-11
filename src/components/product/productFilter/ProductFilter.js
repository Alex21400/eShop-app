import { useEffect, useState } from 'react'
import styles from './ProductFilter.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE } from '../../../redux/slice/filterSlice'
import { FaMaxcdn } from 'react-icons/fa'

const ProductFilter = () => {
  const { products, minPrice, maxPrice } = useSelector(state => state.product)
  const [category, setCategory] = useState('All')
  const [brand, setBrand] = useState('All')
  const [price, setPrice] = useState(2800)

  const allCategories = [
    'All',
    ...new Set(products.map(product => product.category))
  ]

  const allBrands = [
    ...new Set(products.map(product => product.brand))
  ]

  const dispatch = useDispatch()

  // Filter producs by brand
  useEffect(() => {
    dispatch(FILTER_BY_BRAND({products, brand}))
  }, [dispatch, products, brand])

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({products, price}))
  }, [dispatch, products, price])

  // Filter products by category
  const filterProducts = (cat) => {
    setCategory(cat)

    dispatch(FILTER_BY_CATEGORY({products, category: cat}))
  }

  // CLear filters
  const clearFilters = () => {
    setCategory('All')
    setBrand('All')
    setPrice(2800)
  }

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button 
            key={index} 
            type='button' 
            className={`${category}` === cat ? `${styles.active}` : null}
            onClick={() => filterProducts(cat)}>&#8250; {cat}</button>
          )
        })}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="All">All</option>
          {allBrands.map((br, index) => {
            return(
              <option key={index} value={br}>{br}</option>
            )
          })}
        </select>
        <h4>Price</h4>
        <p>{`$${price}`}</p>
        <div className={styles.price}>
          <input type="range" name='price' value={price} onChange={(e) => setPrice(e.target.value)} min={minPrice} max={maxPrice}/>
        </div>
        <br />
        <button className='--btn --btn-orange' onClick={clearFilters}>Clear Filters</button>
      </div>
    </div>
  )
}

export default ProductFilter