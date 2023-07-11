import { useEffect } from 'react'
import styles from './Cart.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import Card from '../../components/card/Card'
import { ADD_TO_CART, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, SAVE_URL } from '../../redux/slice/cartSlice'

const Cart = () => {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(state => state.cart)
  const { isLoggedIn } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  // Decrease cart quantity
  const decreaseCart = (item) => {
    dispatch(DECREASE_CART(item))
  }

  // Increase cart quantity
  const increaseCart = (item) => {
    dispatch(ADD_TO_CART(item))
  }

  // Remove single item from the cart
  const removeItemFromCart = (item) => {
    dispatch(REMOVE_FROM_CART(item))
  }

  // Clear cart completely
  const clearCart = () => {
    dispatch(CLEAR_CART())
  }

  // Calculate the subtotal and total quantity
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL())
    dispatch(CALCULATE_TOTAL_QUANTITY())
    dispatch(SAVE_URL(''))
  }, [dispatch, cartItems])

  const url = window.location.href

  // Run on checkout
  const checkout = () => {
    if(isLoggedIn) {
      navigate('/checkout-details')
    } else {
      dispatch(SAVE_URL(url))
      navigate('/login')
    }
  }

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is empty</p>
            <br />
            <div>
              <Link to='/#products'>&larr; Back To Shop</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  const { name, price, imageURL, cartQuantity } = item

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td style={{ textAlign: 'center'}}>
                        <h4><b>{name}</b></h4>
                        <img src={imageURL} alt={name} style={{ width: '100px'}}/>
                      </td>
                      <td className={styles.price}>
                        <p>{`$${price}`}</p>
                      </td>
                      <td>
                        <div className={styles.count}>
                          <button className='--btn' onClick={() => decreaseCart(item)}>-</button>
                          <p><b>{cartQuantity}</b></p>
                          <button className='--btn' onClick={() => increaseCart(item)}>+</button>
                        </div>
                      </td>
                      <td className={styles.total}>
                        <p>{`$${(price * cartQuantity).toFixed(2)}`}</p>
                      </td>
                      <td className={styles.icons} style={{ textAlign: 'center'}}>
                        <FaTrashAlt size={20} onClick={() => removeItemFromCart(item)} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
                <button className='--btn --btn-orange' onClick={clearCart}>Clear Cart</button>
                <div className={styles.checkout}>
                  <div>
                    <Link to='/#products'>&larr; Back To Shop</Link>
                  </div>
                  <br />
                  <Card cardClass={styles.card}>
                    <p>Cart Item(s): <b>{cartTotalQuantity}</b></p>
                    <div className={styles.text}>
                      <h4>Subtotal: &nbsp;</h4>
                      <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                    </div>
                    <p>Tax and shipping calculated at checkout</p>
                    <button className='--btn --btn-primary --btn-block' onClick={checkout}>Checkout</button>
                  </Card>
                </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Cart