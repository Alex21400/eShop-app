import styles from './ProductDetails.module.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import loaderImg from '../../../assets/loader.gif'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART } from '../../../redux/slice/cartSlice'
import useFetchDocument from '../../../customHooks/useFetchDocument'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import Card from '../../card/Card'
import StarsRating from 'react-star-rate'

const ProductDetails = () => {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  
  // Get product as a document with custom Hook useFetchDocument with ID as parameter
  const { document } = useFetchDocument('products', id)

  // Fetch reviews collection
  const { data } = useFetchCollection('reviews')
  const filteredReviews = data.filter(review => review.productID === id)

  // Check if item exists in the cart and show/hide add remove buttons
  const { cartItems } = useSelector(state => state.cart)
  const cartItem = cartItems.find(item=> item.id === id)

  const isCartAdded = cartItems.findIndex(item => item.id === id)

  const dispatch = useDispatch()

  useEffect(() => {
    setProduct(document)
  }, [document])

  // Add item to the cart
  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }

  // Decreases quantity of item
  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product))
  }

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to='/#products'>
            &larr; Back to products
          </Link>
        </div>
        {product === null ? (
          <img src={loaderImg} alt="Loading..." style={{ width: '100px'}} className='--center-all' />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b>: {product.id}
                </p>
                <p>
                  <b>Brand</b>: {product.brand}
                </p>
                {isCartAdded < 0 ? null : (
                  <>
                    <div className={styles.count}>
                      <button className='--btn' onClick={() => decreaseCart(product)}>-</button>
                      <p>
                        <b>{cartItem.cartQuantity}</b>
                      </p>
                      <button className='--btn --btn-primary' onClick={() => addToCart(product)}>+</button>
                    </div>
                  </>
                )}
                <button className='--btn --btn-orange' onClick={() => addToCart(product)}>Add To Cart</button>
              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>No reviews for this product yet.</p>
            ) : (
              <>
              {filteredReviews.map((item, index) => {
                const { rate, review, reviewDate, userName} = item

                return (
                  <div className={styles.review} key={index}>
                    <StarsRating value={rate} />
                    <p>{review}</p>
                    <span>
                      <p className={styles.username}>{userName}</p>
                      <p className={styles.date}>{reviewDate}</p>
                    </span>
                  </div>
                )
              })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  )
}

export default ProductDetails