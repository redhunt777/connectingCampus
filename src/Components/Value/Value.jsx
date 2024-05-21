import React, { useState } from 'react'

import'./Value.css'
const Value = () => {
  return (
    <section className="v-wrapper"id='buy'>
        <div className="paddings innerWidth flexCenter v-container">
          <div className="v-left">
            <div className="image-container">
            <img src='./value.png'alt=''/>
            </div>
          </div>
          {/*RIGHT SIDE*/}
          <div className="flexColStart v-right">
            <span className='orangeText'>Buy Bonanza</span>
            <span className='primaryText'>Items For Sale</span>
            <span className='secondaryText'>Discover student-to-student treasures: Find affordable essentials and unique finds curated by fellow college peers.
                <br/>
            </span>
            <button className='button'>
              <a href="./LogIn/index.html">
              Group Chat for Sell and Buy
              </a>

            </button>
           
          </div>
        </div>
    </section>

    )
}

export default Value
