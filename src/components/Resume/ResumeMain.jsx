import React from 'react';
import ResumePdf from '../../Data/Linkon_Dev_4.pdf';
const ResumeMain = () => {
    return (
        <div>
            <div className="container">
                <div className="text-center">
                    <a href={ResumePdf} download="Resume of Dev Linkon">
                        <button className="btn btn-success mb-5">Download Resume</button>
                    </a>
                </div>
                <div className>

                </div>
            </div>
        </div>
    );
};

export default ResumeMain;