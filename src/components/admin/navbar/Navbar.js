import React from 'react'
import styles from './Navbar.module.scss'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const activeClass = ({isActive}) => (isActive ? `${styles.active}` : '')

const Navbar = () => {
  const { userName } = useSelector(state => state.auth)

  return (
    <div className={styles.navbar}>
        <div className={styles.user}>
            <FaUserCircle size={40} color='#fff' />
            <h3>{userName}</h3>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to='home' className={activeClass}>Home</NavLink>
            </li>
            <li>
              <NavLink to='view-products' className={activeClass}>View Products</NavLink>
            </li>
            <li>
              <NavLink to='add-product/ADD' className={activeClass}>Add Product</NavLink>
            </li>
            <li>
              <NavLink to='orders' className={activeClass}>Orders</NavLink>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Navbar