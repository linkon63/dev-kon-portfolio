import React from 'react';
import './Card.css'
const Card = ({ image, content }) => {
    return (
        <div>
            <div className="container d-flex justify-content-center ">
                <div className="card ">
                    <div className="imgBx">
                        <img src={image} />
                    </div>
                    <div className="contentBx">
                        <div style={{ fontSize: "20px", color:"white" }}>{content}</div>
                        <div className="size">
                            <h3>Size:</h3>
                            <span>7</span>
                            <span>8</span>
                            <span>9</span>
                            <span>10</span>
                        </div>
                        <div className="color">
                            <h3>Color :</h3>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <a href="#">Details</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;