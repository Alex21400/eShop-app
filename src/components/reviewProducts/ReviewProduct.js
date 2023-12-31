import React, { useEffect, useState } from 'react'
import styles from './ReviewProducts.module.scss'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import StarsRating from 'react-star-rate'
import Card from '../card/Card'
import { toast } from 'react-toastify'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/Config'
import useFetchDocument from '../../customHooks/useFetchDocument'
import loaderImg from '../../assets/loader.gif'

const ReviewProduct = () => {
  const [rate, setRate] = useState(0)
  const [review, setReview] = useState('')
  const [product, setProduct] = useState(null)

  const { id } = useParams()
  const { document } = useFetchDocument('products', id)
  const { userID, userName }= useSelector(state => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    setProduct(document)
  }, [document])

  // Submit review function
  const submitReview = (e) => {
    e.preventDefault()

    const today = new Date()
    const date = today.toDateString()

    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate()
    }
    
    try {
      addDoc(collection(db, 'reviews'), reviewConfig)
      toast.success('Review submited')
      setRate(0)
      setReview('')
      navigate(`/order-history`)
    }catch(error) {
      toast.error(error.message)
    }
  }

  return (
    <section>
        <div className={`container ${styles.review}`}>
            <h2>Rate this product</h2>
            {product === null ? (
                <img src={loaderImg} alt="Loading..." className='--center-all' style={{ width: '100px'}} />
            ) : (
                <>
                <p>
                    <b>Product name:</b> {product.name}
                </p>
                <img src={product.imageURL} alt={product.name} style={{ width: '120px'}} />
                <Card cardClass={styles.card}>
                    <form onSubmit={(e) => submitReview(e)}>
                        <label>Rating:</label>
                        <StarsRating
                        value={rate}
                        onChange={rate => setRate(rate)}
                        />
                        <label>Review:</label>
                        <textarea value={review} onChange={(e) => setReview(e.target.value)} required cols="30" rows="10"></textarea>
                        <button type='submit' className='--btn --btn-primary'>Submit Review</button>
                    </form>
                </Card>
                </>
            )}
        </div>
    </section>
  )
}

export default ReviewProduct