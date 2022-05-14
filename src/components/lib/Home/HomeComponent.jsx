import React from 'react';

const HomeComponent = () => {
    return (
        <section className=''>
            {/* header section */}
            <header className='d-flex justify-content-center border' style={{ height: '90vh' }}>
                <h1>
                    Projects
                </h1>
            </header>
            {/* card section */}
            <section className='border border-primary border-2 mt-5'>
                <div className="d-flex ">
                    <div className="col-md-4">
                        <h1>Card 1</h1>
                    </div>
                    <div className="col-md-4">
                        <h1>Card 2</h1>
                    </div>
                    <div className="col-md-4">
                        <h1>Card 2</h1>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default HomeComponent;