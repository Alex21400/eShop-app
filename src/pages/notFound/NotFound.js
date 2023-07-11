import React from 'react'
import styles from './NotFound.module.scss'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className={styles['not-found']}>
        <h2>404</h2>
        <h4>Ooops, page not found</h4>
        <div>
            <Link to='/'>&larr; Back to <b>Home Page</b></Link>
        </div>
    </div>
  )
}

export default NotFound