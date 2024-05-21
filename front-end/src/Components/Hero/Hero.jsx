import React from 'react';
import "./Hero.css";
import { HiLocationMarker } from 'react-icons/hi';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="hero-wrapper">
            <div className="paddings innerWidth flexCenter hero-container">
                <div className="flexColStart hero-left">
                    <div className="hero-title">
                        <div className="orange-circle"></div>
                        <motion.h1
                            initial={{ y: "2rem", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 2,
                                type: "spring"
                            }}
                        >
                            Uncover Your Campus<br /><br/>Events,Lost & Found<br /> and Trade Corner
                        </motion.h1>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    
                    <div className="flexColStart hero-des">
                        <span className="secondaryText">Find all infos about College Upcoming Events</span>
                        <br></br>
                        <span className="secondaryText">An Effortless Nexus for College Event Updates, Lost&found, Buying and Selling items</span>
                        <span className="secondaryText"> and Carpooling needs within the College Premises</span>
                    </div>
                   
                    <div className="flexCenter stats">
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp start={8800} end={9000} duration={4} />
                                <span>+</span>
                                <div className="secondaryText">UG and PG Students</div>
                            </span>
                        </div>
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp start={650} end={780} duration={4} />
                                <span>+</span>
                                <div className="secondaryText">Acres of Lush Green Campus</div>
                            </span>
                        </div>
                        <div className="flexColCenter stat">
                            <span>
                                <CountUp end={17} />
                                <span>+</span>
                            </span>
                            <div className="secondaryText">Academic Departments</div>
                        </div>
                    </div>
                </div>
                {/*right side*/}
                <div className="flexCenter hero-right">
                <motion.div
                        initial={{ x: "7rem", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            duration: 2,
                            type: "spring",
                        }}
                        className="image-container"
                    >
                        <img src='./hero-image.jpeg' alt='' />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

export default Hero;
