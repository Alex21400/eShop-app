import React from 'react'
import styles from './Admin.module.scss'
import Navbar from '../../components/admin/navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default Admin