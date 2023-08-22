import React from 'react';
import './Card.css'
const Card = ({ image, content, color, join, end, detail }) => {
    return (
        <div>
            <div className="container d-flex justify-content-center ">
                <div className="card" style={{ backgroundColor: `${color}` }}>
                    <div className="imgBx">
                        <img src={image} />
                    </div>
                    <div className="contentBx">
                        <div style={{ fontSize: "20px", color: "white" }}>{content}</div>
                        <div className="size d-flex">
                            <h3>Joined: {join}</h3>
                        </div>
                        <div className="size d-flex">
                            <h3>End: {end}</h3>
                        </div>
                        <div className="size d-flex">
                            <h3 className='text-light'>{detail}</h3>
                        </div>

                        <a href="#">Info</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;