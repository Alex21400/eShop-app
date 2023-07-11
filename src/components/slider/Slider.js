import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { sliderData } from './slider-data'
import './Slider.scss'

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderLength = sliderData.length

  const autoScroll = true
  let slideInterval
  let intervalTime = 5000

  // Move to the next slide
  const nextSlide = () => {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1)
  }

  // Move to the previous slide
  const previousSlide = () => {
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1)
  }

  // On init set the slider to index 0
  useEffect(() => {
    setCurrentSlide(0)
  }, [])

  // if autoscroll is true, make slider auto scroll
  useEffect(() => {
    if(autoScroll){
        const auto = () => {
            slideInterval = setInterval(nextSlide, intervalTime)
        }
        auto()
    }

    return () => {
        clearInterval(slideInterval)
    }
  }, [currentSlide, autoScroll, slideInterval])

  return (
    <div className='slider'>
        <AiOutlineArrowLeft  className='arrow prev' onClick={previousSlide}/>
        <AiOutlineArrowRight className='arrow next' onClick={nextSlide}/>

        {sliderData.map((item, index) => {
            return (
                <div key={index} className={index === currentSlide ? 'slide current' : 'slide'}>
                    {index === currentSlide && (
                        <>
                            <img src={item.image} alt="slide-img" />
                            <div className='content'>
                                <h2>{item.heading}</h2>
                                <p>{item.description}</p>
                                <hr />
                                <a href="#product" className='--btn --btn-primary'>Shop Now</a>
                            </div>
                        </>
                    )}
                </div>
            )
        })}
    </div>
  )
}

export default Slider