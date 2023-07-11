import React, { useState } from 'react'
import Card from '../../components/card/Card'
import styles from './Authentication.module.scss'
import registerImg from '../../assets/register.svg'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase/Config'
import Loader from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState('')  
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Register user on submit
  const registerUser = (e) => {
    e.preventDefault()
    
    if(password !== confirmPassword) {
        toast.error('Passwords do not match')
    }
    setIsLoading(true)

    // Firebase
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    // const user = userCredential.user;
    setIsLoading(false)  
    // Add username to profile (createUserWithEmailAndPassword does not include userName on its own, you must add it seperately)
    updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: ''
    })
    .then(() => {
        //
    })
    .catch((error) => {
        toast.error(error.message)
    })
    navigate('/login')
    toast.success('User registered successfully')
    })
    .catch((error) => {
        // Catch error
        // const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
        setIsLoading(false)
    });
  }

  return (
    <>
    <ToastContainer />
    {isLoading && <Loader />}
        <section className={`${styles.auth} container`}>
            <Card>
                <div className={styles.form}>
                    <h2>Register</h2>
                    <form onSubmit={registerUser}>
                        <input type="text" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input type="text" placeholder='Username' required value={userName} onChange={(e) => setUserName(e.target.value)}/>
                        <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <input type="password" placeholder='Confirm password' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
                    </form>
                    <span className={styles.register}>
                        <p>Already have an account?&nbsp;</p>
                        <Link to='/login'>Login</Link>
                    </span>
                </div>
            </Card>

            <div className={styles.img}>
                <img src={registerImg} alt="Login-img" width={400} />
            </div>
        </section>
    </>
  )
}

export default Register