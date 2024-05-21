import React from "react";
import "./Companies.css";
const Companies=()=>{
    return(
        <section className="c-wrapper">
            <p className="orangeText padding flexColStart heavy">Major Events and Fests</p>
            <div className="padding innerWidth flexCenter c-container ">
                <img className="r-card" src="./prologis.png" alt=""/>
                <img  className="r-card"src="./tower.png" alt=""/>
                <img  className="r-card"src="./equinix.png" alt=""/>
                <img className="oye r-card" src="./reality.png" alt=""/>
            </div>
        </section>
    );
}
    export default Companies;