import React from 'react'
import {Swiper,SwiperSlide,useSwiper} from 'swiper/react'
import"swiper/css"
import'./Residencies.css'
import data from'../../utils/slider.json';
import { slidersettings } from '../../utils/common';
const Residencies = () => {
  return (
    <section className="r-wrapper">
        <div className="padding innerWidth r-container">
          <div className="r-head flexColStart">
            <span className='orangeText'>Upcoming Events</span>
            <span className='primaryText'>Newsroom</span>
          </div>
          <Swiper {...slidersettings}>
            <SliderButtons/>
            {
              data.map((card,i)=>(
                <SwiperSlide key={i}>
                  <div className="r-card flexColStart">
                    <img src={card.image}alt='home'/>

                    <span className="secondaryText r-price">
                      <span style={{color:"orange"}}></span>
                      <span className='orangeText'>{card.price}</span>
                      </span>
                      <span className="primaryText">{card.name}</span>
                      <span className="secondaryText">{card.detail}</span>
                  </div>
                </SwiperSlide>

              ))
            }
          </Swiper>
        </div>
    </section>
  )
}

export default Residencies
const SliderButtons=()=>{
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  )
  
}