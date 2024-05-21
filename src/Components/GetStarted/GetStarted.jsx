import React, { useState } from 'react';

const GetStarted = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className='primaryText'>Get Started with Connecting Campus</span>
          <span className='secondaryText'>Stay Connected for more awesome and specially brewed updates</span>
          <br/>
          <button className="button" onClick={toggleMenu}>
            Contact Us
          </button>
          {menuOpen && (
            <div className="menu">
                <p className="orangeText">Linked In Links</p>
              <a  className='primaryText' href="https://www.linkedin.com/in/shauryaaditya99/">Shaurya Aditya Verma</a>
              <br/>
              <a className='primaryText' href="https://www.linkedin.com/in/ansh-khanna-88b4692b8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">Ansh Khanna</a>
              <br/>
              <a className='primaryText' href="https://www.linkedin.com/in/sarthak-singh-b44466298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">Sarthak Singh</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default GetStarted;
