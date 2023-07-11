import { useEffect, useState } from 'react'
import styles from './ViewProducts.module.scss'
import { toast, ToastContainer } from 'react-toastify'
import { db, storage } from '../../../firebase/Config'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Loader from '../../loader/Loader'
import { doc, deleteDoc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import Notiflix from 'notiflix'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_PRODUCTS } from '../../../redux/slice/productSlice'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import Search from '../../search/Search'
import { FILTER_BY_SEARCH } from '../../../redux/slice/filterSlice'
import Pagination from '../../pagination/Pagination'

const ViewProducts = () => {
  const { data, isLoading } = useFetchCollection('products')
  const [search, setSearch] = useState('')

  const products = useSelector(state => state.product.products)
  const filteredProducts = useSelector(state => state.filter.filteredProducts)
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(6)

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct, 
    indexOfLastProduct
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(STORE_PRODUCTS({
      products: data
    }))
  }, [dispatch, data])

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({products, search}))
  }, [dispatch, products, search])

  // On init load the products
  // useEffect(() => {
  //   getProducts()
  // }, [])

  // Get products from firestore database
  // const getProducts = () => {
  //   setIsLoading(true)

  //   try{
  //     const productsRef = collection(db, 'products')
  //     const q = query(productsRef, orderBy("createdAt", "desc"));

  //     onSnapshot(q, (snapshot) => {
  //       // console.log(snapshot.docs)
  //       const allProducts = snapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }))
  //       // console.log(allProducts)
  //       setProducts(allProducts)
  //       setIsLoading(false)
  //       // Send products to the redux slice
  //       dispatch(STORE_PRODUCTS({
  //         products: allProducts
  //       }))
  //     })
  //   }catch(error){
  //     setIsLoading(false)
  //     toast.error(error.message)
  //   }
  // }

  // Pop-up confirmation before deleting product
  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Product',
      'Do You really want to delete this product?',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageURL)
      },
      function cancelCb() {
        console.log('Canceled')
      },
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: '#0f2f5f',
        okButtonBackground: '#0f2f5f',
        cssAnimationStyle: 'zoom'
        // etc...
      },
    );
  }

  // Delete product on click
  const deleteProduct = async (id, imageURL) => {
    try {
      // Deletes the document in database
      await deleteDoc(doc(db, 'products', id))

      // Deletes the image in storage
      const storageRef = ref(storage, imageURL)
      await deleteObject(storageRef)
      .then(() => {
        toast.success('Product deleted')
      })
      .catch(error => {
        toast.error(error.message)
      })

    }catch(error){
      toast.error(error.message)
    }
  }

  return (
    <>
    <ToastContainer />
    {isLoading && <Loader />}
    <div className={styles.table}>
      <h2>All Products</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <>
          <div className={styles.search}>
            <p>
              <b>{filteredProducts.length}</b>Products found
            </p>
            <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
          </div>  
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {currentProducts.map((product, index) => {
              const { id, imageURL, name, category, price } = product

              return (
                  <tr key={id}> 
                    <td>
                      {index + 1}
                    </td>
                    <td>
                      <img src={imageURL} alt={name} width={100} />
                    </td>
                    <td>
                      {name}
                    </td>
                    <td>
                      {category}
                    </td>
                    <td>
                      <b>{`$${price}`}</b>
                    </td>
                    <td>
                      <div className={styles.icons}>
                        <Link to={`/admin/add-product/${id}`}>
                          <FaEdit size={24} />
                        </Link>
                        &nbsp;
                        <FaTrashAlt size={22} onClick={() => confirmDelete(id, imageURL)}/>
                      </div>
                    </td>
                  </tr>
              )
            })}
            </tbody>
          </table>
        </>
      )}
      <Pagination
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      productsPerPage={productsPerPage}
      totalProducts={filteredProducts.length}
       />
    </div>
    </>
  )
}

export default ViewProducts