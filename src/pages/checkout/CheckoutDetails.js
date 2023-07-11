import { useState } from 'react'
import styles from './CheckoutDetails.module.scss'
import Card from '../../components/card/Card'
import { CountryDropdown } from 'react-country-region-selector'
import { useDispatch } from 'react-redux'
import { SAVE_BILLING_ADRESS, SAVE_SHIPPING_ADRESS } from '../../redux/slice/checkoutSlice'
import { useNavigate } from 'react-router-dom'
import CheckoutSummary from '../../components/checkoutSummary/CheckoutSummary'

const initialAdressState = {
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    phone: ''
}

const CheckoutDetails = () => {
  const [shippingAdress, setShippingAdress] = useState({...initialAdressState})
  const [billingAdress, setBillingAdress] = useState({...initialAdressState})

  const dispatch = useDispatch()

  const navigate = useNavigate()

  // Handle shipping function
  const handleShipping = (e) => {
    const { name, value } = e.target
    setShippingAdress({
        ...shippingAdress,
        [name]: value
    })
  }

  // Handle billing function
  const handleBilling = (e) => {
    const { name, value } = e.target
    setBillingAdress({
        ...billingAdress,
        [name]: value
    })
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    
    dispatch(SAVE_SHIPPING_ADRESS(shippingAdress))
    dispatch(SAVE_BILLING_ADRESS(billingAdress))

    navigate('/checkout')
  }

  return (
    <section>
        <div className={`container ${styles.checkout}`}>
            <h2>Checkout Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* SHIPPING ADRESS */}
                    <Card cardClass={styles.card}>
                        <h3>Shipping Adress</h3>
                        <label>Recipient's name:</label>
                        <input type="text" placeholder='Recipient name' name='name' required value={shippingAdress.name} onChange={(e) => handleShipping(e)}/>
                        <label>Adress line 1:</label>
                        <input type="text" placeholder='Adress line 1' name='line1' required value={shippingAdress.line1} onChange={(e) => handleShipping(e)} />
                        <label>Adress line 2:</label>
                        <input type="text" placeholder='Adress line 2' name='line2' value={shippingAdress.line2} onChange={(e) => handleShipping(e)} />
                        <label>City:</label>
                        <input type="text" placeholder='City' name='city' required value={shippingAdress.city} onChange={(e) => handleShipping(e)} />
                        <label>State:</label>
                        <input type="text" placeholder='State' name='state' required value={shippingAdress.state} onChange={(e) => handleShipping(e)} />
                        <label>Postal code:</label>
                        <input type="text" placeholder='Postal code' name='postal_code' required value={shippingAdress.postal_code} onChange={(e) => handleShipping(e)} />
                        <label>Country:</label>
                        <CountryDropdown
                        valueType='short'
                        className={styles.select}
                        value={shippingAdress.country}
                        onChange={(val) => handleShipping({
                            target: {
                                name: 'country',
                                value: val
                            }
                        })}
                        />
                        <label>Phone:</label>
                        <input type="text" placeholder='Phone' name='phone' required value={shippingAdress.phone} onChange={(e) => handleShipping(e)} />
                    </Card>
                    {/* BILLING ADRESS */}
                    <Card cardClass={styles.card}>
                    <h3>Billing Adress</h3>
                        <label>Recipient's name:</label>
                        <input type="text" placeholder='Name' name='name' required value={billingAdress.name} onChange={(e) => handleBilling(e)}/>
                        <label>Adress line 1:</label>
                        <input type="text" placeholder='Adress line 1' name='line1' required value={billingAdress.line1} onChange={(e) => handleBilling(e)} />
                        <label>Adress line 2:</label>
                        <input type="text" placeholder='Adress line 2' name='line2' value={billingAdress.line2} onChange={(e) => handleBilling(e)} />
                        <label>City:</label>
                        <input type="text" placeholder='City' name='city' required value={billingAdress.city} onChange={(e) => handleBilling(e)} />
                        <label>State:</label>
                        <input type="text" placeholder='State' name='state' required value={billingAdress.state} onChange={(e) => handleBilling(e)} />
                        <label>Postal code:</label>
                        <input type="text" placeholder='Postal code' name='postal_code' required value={billingAdress.postal_code} onChange={(e) => handleBilling(e)} />
                        <label>Country:</label>
                        <CountryDropdown
                        valueType='short'
                        className={styles.select}
                        value={billingAdress.country}
                        onChange={(val) => handleBilling({
                            target: {
                                name: 'country',
                                value: val
                            }
                        })}
                        />
                        <label>Phone:</label>
                        <input type="text" placeholder='Phone' name='phone' required value={billingAdress.phone} onChange={(e) => handleBilling(e)} />
                        
                        <button type='submit' className='--btn --btn-primary'>Proceed To Checkout</button>
                    </Card>
                </div>
                <div>
                    <Card cardClass={styles.card}>
                        <CheckoutSummary />
                    </Card>
                </div>
            </form>
        </div>
    </section>
  )
}

export default CheckoutDetails