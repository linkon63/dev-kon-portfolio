import React from 'react';
import './HomeComponent.css'
const HomeComponent = () => {
    return (
        <section className='container mt-2'>
            {/* header section */}
            <header className='row justify-content-center' style={{ height: '60vh' }}>
                <div className="col-md-6 col-sm-12 top-header-left">
                    <h1>JS</h1>
                </div>
                <div className="col-md-6 col-sm-12">
                    <h5>No JS</h5>
                </div>
            </header>
            {/* card section */}
            <div className='border border-primary border-2 mt-5'>
                <div className="row g-0 m-0">
                    <div className="col-md-4 col-sm-12">
                        <h1>Card 1</h1>
                        {/* <Text />  */}
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <h1>Card 2</h1>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <h1>Card 2</h1>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeComponent;