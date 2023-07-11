import { useState } from 'react'
import styles from './Authentication.module.scss'
import loginImg from '../../assets/login.svg'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import Card from '../../components/card/Card'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase/Config'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  // const { previousURL } = useSelector(state => state.cart)

  // Redirects user based on previous URL
//   const redirectUser = () => {
//     if(previousURL.includes('cart')){
//         return navigate('/cart')
//     }
//     navigate('/')
//   }

  // Login user on submit
  const loginUser = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Firebase
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
    // Signed in 
    setIsLoading(false)
    toast.success('Sign in successful')
    console.log(email)
    console.log(password)
    console.log(auth)  
    navigate('/')
    navigate(0)
    // redirectUser() 
    })
    .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        toast.error(error.message)
        setIsLoading(false)
    }); 
  }

  // Sign in user with google
  const provider = new GoogleAuthProvider()
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        toast.success('Login successful')
        navigate('contact')
        // redirectUser()
    }).catch((error) => {
        // Handle Errors here.
        toast.error(error.message)
    });
  }

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
        <section className={`${styles.auth} container`}>
            <div className={styles.img}>
                <img src={loginImg} alt="Login-img" width={400} />
            </div>

            <Card>
                <div className={styles.form}>
                    <h2>Login</h2>
                    <form onSubmit={(e) => loginUser(e)}>
                        <input type="text" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
                        <div className={styles.links}>
                            <Link to='/reset-password'>Reset Password</Link>
                        </div>
                        <p>-- or --</p>
                    </form>
                    <button onClick={signInWithGoogle} className='--btn --btn-orange --btn-block'><FaGoogle/>&nbsp;Login With Google</button>
                    <span className={styles.register}>
                        <p>Don't have an account?&nbsp;</p>
                        <Link to='/register'>Register</Link>
                    </span>
                </div>
            </Card>
        </section>
    </>
  )
}

export default Login