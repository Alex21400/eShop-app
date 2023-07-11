import React from 'react'
import { Outlet } from 'react-router-dom'

// components
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const RootLayout = () => {
  return (
    <div className='root-layout' style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main style={{ flexGrow: "1" }}>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default RootLayout