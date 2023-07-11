import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { CALCULATE_TOTAL_QUANTITY, CALCULATE_SUBTOTAL } from "../../redux/slice/cartSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const BACKEND_URL = process.env.BACKEND_URL

const Checkout = () => {
  const [message, setMessage] = useState("Initializing checkout...")
  const [clientSecret, setClientSecret] = useState("");

  const { cartItems, cartTotalAmount } = useSelector(state => state.cart)
  const { email } = useSelector(state => state.auth)
  const { shippingAdress, billingAdress } = useSelector(state => state.checkout)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY())
    dispatch(CALCULATE_SUBTOTAL())
  }, [dispatch, cartItems])

  const description = `eShop payment: email: ${email}, amount: ${cartTotalAmount}`

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${BACKEND_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        items: cartItems,
        userEmail: email,
        shipping: shippingAdress,
        billing: billingAdress,
        description
      }),
    })
      .then((res) => {
        if(res.ok) {
          return res.json()
        } 
        return res.json().then((json) => Promise.reject(json))
      })
      .then((data) => {
        setClientSecret(data.clientSecret)
      })
      .catch((error) => {
        setMessage('Failed to initialize checkout')
        toast.error('Something went wrong')
      })
  }, [billingAdress, cartItems, shippingAdress, description, email]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
   <>
    <section>
      <div className="container">
        {!clientSecret && <h3>{message}</h3>}
      </div>
    </section>
    {clientSecret && (
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    )}
   </>
  )
}

export default Checkout