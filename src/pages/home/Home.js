import { useEffect } from 'react'
import Slider from '../../components/slider/Slider'
import Product from '../../components/product/Product'

const Home = () => {
  const url = window.location.href
  
  const scrollToProductsSection = () => {
    if(url.includes('#products')){
      window.scrollTo({
        top: 900,
        behavior: 'smooth'
      })
      return
    }
  }

  useEffect(() => {
    scrollToProductsSection()
  }, [scrollToProductsSection])

  return (
    <div>
      <Slider />
      <Product />
    </div>
  )
}

export default Home