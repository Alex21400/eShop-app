import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Admin.module.scss'

const NotAdmin = () => {
  return (
    <section className={styles['not-admin']}>
        <div className={styles['not-admin-content']}>
            <h2>You are not an admin.</h2>
            <h3>Go back to the <Link to='/'>Home Page</Link></h3>
        </div>   
    </section>
  )
}

export default NotAdmin