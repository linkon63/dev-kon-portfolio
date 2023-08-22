import React from 'react';

import './Cycle.css'
const Cycle = () => {
    return (
        <div>

            <div className="container">
                <div className="row">
                    <br />
                    <div className="col text-center">
                        <h2>Bootstrap 4 counter</h2>
                        <p>counter to count up to a target number</p>
                    </div>



                </div>
                <div className="row">
                    <div className="col">
                        <div className="counter">
                            <i className="fa fa-code fa-2x"></i>
                            <p className="count-text ">Code</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="counter">
                            <i className="fa fa-coffee fa-2x"></i>
                            <p className="count-text ">Coffee</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="counter">
                            <i className="fa fa-lightbulb-o fa-2x"></i>
                            <p className="count-text ">Idea</p>
                        </div></div>
                    <div className="col">
                        <div className="counter">
                            <i className="fa fa-bug fa-2x"></i>
                            <p className="count-text ">Fix Bug</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cycle;