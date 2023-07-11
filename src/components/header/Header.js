import React from 'react'
import styles from './Header.module.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo  from '../../assets/logo.png'
import { FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa'
import { HiMenuAlt3 } from 'react-icons/hi'
import { useState, useEffect } from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/Config'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from '../../redux/slice/authSlice'
import { CALCULATE_TOTAL_QUANTITY } from '../../redux/slice/cartSlice'
import AdminOnlyRoute from '../adminOnlyRoute/AdminOnlyRoute'

const logo = (
  <div className={styles.logo}>
    <Link to='/'>
      <img src={Logo} alt="" />
    </Link>
  </div>
)

const activeClass = ({ isActive }) => (isActive ? `${styles.active}` : null)

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [scrollPage, setScrollPage] = useState(false)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { isLoggedIn } = useSelector(state => state.auth)
  const { cartTotalQuantity, cartItems } = useSelector(state => state.cart)

  // Calculate cart total quantity
  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }, [dispatch, cartItems])

  useEffect(() => {
    // Monitor currently signed in user
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setDisplayName(user.displayName)

        dispatch(SET_ACTIVE_USER({
          isLoggedIn: true,
          email: user.email,
          userName: user.displayName,
          userID: user.uid
        }))
        // ...
      } else {
        // User is signed out
        setDisplayName('')
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  }, [dispatch, displayName])
  
  // Toggle menu on click
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  // Hide menu on click
  const hideMenu = () => {
    setShowMenu(false)
  }

  // Sign out user
  const logoutUser = () => {
    signOut(auth).then(() => {
      //Sign-out successful
      toast.success('User signed out')
      navigate('/')   
    }).catch((error) => {
      // An error happened
      toast.error(error.message)
    })
  }

// Check if window is scrolling or not
const fixNavBar = () => {
  if(window.scrollY > 50){
    setScrollPage(true)
  } else{
    setScrollPage(false)
  }
}
window.addEventListener('scroll', fixNavBar)

  // Cart element
  const cart = (
    <span className={styles.cart}>
      <Link to='cart'>
        Cart
        <FaShoppingCart size={ 20 } />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  )

  return (
    <>
      <ToastContainer />
      <header className={scrollPage ? `${styles.fixed}` : null}>
        <div className={styles.header}>
          {logo}

          <nav className={showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`}>
            <div 
            onClick={hideMenu}
            className={showMenu ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}` : `${styles['nav-wrapper']}`}>
            </div>  
              <ul onClick={hideMenu}>
                <li className={styles['logo-mobile']}>
                  {logo}
                  <FaTimes size={22} color='#fff' onClick={hideMenu} />
                </li>
                <li>
                  <AdminOnlyRoute>
                    <Link to='admin/home'>Admin</Link>
                  </AdminOnlyRoute>  
                </li>
                <li>
                  <NavLink to='/' className={activeClass}>Home</NavLink>
                </li>
                <li>
                  <NavLink to='contact' className={activeClass}>Contact Us</NavLink>
                </li>
              </ul>
              <div className={styles["header-right"]} onClick={hideMenu}>
                <span className={styles.links}>
                  {isLoggedIn ?  null : (<NavLink to='login' className={activeClass}>Login</NavLink>)}
                  {isLoggedIn ? (
                    <a href="/" style={{ color: '#FFBF00'}}>
                      <FaUserCircle size={18} />
                      Hi, {displayName}
                    </a>
                  ) : ('')}
                  {isLoggedIn ? null : (<NavLink to='register' className={activeClass}>Register</NavLink>)}
                  {isLoggedIn ? (<NavLink to='order-history' className={activeClass}>Order History</NavLink>) : null}
                  {isLoggedIn ? (<NavLink to='/' onClick={logoutUser}>Logout</NavLink>) : null}
                </span>
                {cart}
              </div> 
          </nav>

          <div className={styles['menu-icon']}>
            {cart}
            <HiMenuAlt3 size={28} onClick={toggleMenu} />
          </div>

        </div>
      </header>
    </>
  )
}

export default Header