import React, { useState } from 'react'
import styles from './Authentication.module.scss'
import resetImg from '../../assets/resetPassword.svg'
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/Config'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'

const Reset = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Reset password on submit
  const resetPassword = (e) => {
    e.preventDefault()
    setIsLoading(true)

    sendPasswordResetEmail(auth, email)
    .then(() => {
    setIsLoading(false)
    toast.success('Email for reset sent. Check Your mailbox.')
    setEmail('')
    })
    .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    setIsLoading(false)
    toast.error(error.message)
    });
  }

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader /> }
        <section className={`${styles.auth} container`}>
            <div className={styles.img}>
                <img src={resetImg} alt="Login-img" width={400} />
            </div>

            <Card>
                <div className={styles.form}>
                    <h2>Login</h2>
                    <form onSubmit={resetPassword}>
                        <input type="text" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button type='submit' className='--btn --btn-primary --btn-block'>Reset Password</button>
                        <div className={styles.links}>
                            <Link to='/register'>Register</Link>
                            <Link to='/login'>Login</Link>
                        </div>
                    </form>
                </div>
            </Card>
        </section>
    </>
  )
}

export default Reset