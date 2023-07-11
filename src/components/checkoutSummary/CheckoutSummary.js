import React from 'react'
import styles from './CheckoutSummary.module.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '../card/Card'

const CheckoutSummary = () => {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(state => state.cart)

  return (
    <div>
        <h3>Checkout Summary</h3>
        <div>
            {cartItems.length === 0 ? (
                <>
                    <p>No items in the cart</p>
                    <button className='--btn'>
                        <Link to='/#products'>&larr; Back To Shop</Link>
                    </button>
                </>
            ) : (
                <div>
                    <p>Cart Item(s): <b>{cartTotalQuantity}</b></p>
                    <div className={styles.text}>
                        <h4>Subtotal</h4>
                        <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                    </div>
                    {cartItems.map((item, index) => {
                        const { id, name, price, cartQuantity} = item

                        return (
                            <Card key={id} cardClass={styles.card}>
                                <h4>Product: {name}</h4>
                                <p>Quantity: <b>{cartQuantity}</b></p>
                                <p>Unit Price: <b>{`$${price}`}</b></p>
                                <p>Set Price: <b>{`$${price * cartQuantity}`}</b></p>
                            </Card>
                        )
                    })}
                </div>    
            )}
        </div>
    </div>
  )
}

export default CheckoutSummary