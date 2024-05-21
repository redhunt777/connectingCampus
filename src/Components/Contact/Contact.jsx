import React from 'react';
import './Contact.css';
import { MdCall } from 'react-icons/md';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { HiChatBubbleBottomCenter } from 'react-icons/hi2';

const Contact = () => {
  return (
    <div>
      <section className="c-wrapper" id='carpooling'>
        <div className="padding innerWidth flexCenter c-container">
          {/* Left side */}
          <div className="c-left flexColStart">
            <span className='orangeText'>Carpool Corner: Ride Together</span>
            <span className='primaryText'>Carpooling made easy</span>
            <span className='secondaryText'>Share the ride, share the savings: Link up with fellow travelers for convenient carpooling to stations and bus terminals, saving time and money on your daily commutes.</span>
            {/* Button */}
            <br/>
            <button className="button">
              <a href="./chat_application/index.html">Group Chat for Carpooling</a>
            </button>
          </div>
          {/* Right side */}
          <div className="c-right">
            <div className="image-container">
              <img src='./contact.jpeg' alt='' />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;

