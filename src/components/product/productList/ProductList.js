import { useEffect, useState } from 'react'
import styles from './ProductList.module.scss'
import { BsFillGridFill } from 'react-icons/bs'
import { FaListAlt } from 'react-icons/fa'
import Search from '../../search/Search'
import ProductItem from '../productItem/ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_SEARCH, SORT_PRODUCTS } from '../../../redux/slice/filterSlice'
import Pagination from '../../pagination/Pagination'

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('latest')

  const { filteredProducts }= useSelector(state => state.filter)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(6)
  // Get current Product
  const indefOfLastProduct = currentPage * productsPerPage
  const indefOfFirstProduct = indefOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indefOfFirstProduct, indefOfLastProduct)

  const dispatch = useDispatch()

  // Filter products by search input
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({products, search}))
  }, [dispatch, products, search])

  // Sort products 
  useEffect(() => {
    dispatch(SORT_PRODUCTS({products, sort}))
  }, [dispatch, products, sort])

  return (
    <div className={styles['product-list']} id='products'>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color={grid ? `#e8743f` : 'grey'} onClick={() => setGrid(true)} />
          <FaListAlt size={24} color={grid ? 'grey' : '#e8743f'} onClick={() => setGrid(false)} />
          <p>
            <b>{filteredProducts.length}</b> Products found.
          </p>
        </div>
        {/* Search icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (
          <p>No products found!</p>
        ) : (
          <>
          {currentProducts.map(product => {
            return (
                <ProductItem {...product} grid={grid} product={product} key={product.id}/>
            )
          })}
          </>
        )}
      </div>
      <Pagination
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      productsPerPage={productsPerPage}
      totalProducts={filteredProducts.length}
       />
    </div>
  )
}

export default ProductList