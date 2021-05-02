import { config, useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import React, { useState } from 'react';
import AboutMeImage from '../../Data/Aboutme.jpg';
const AboutMeSection = () => {
    const [flip, set] = useState(false)

    const words = ['QUICK LEARNER', 'PROBLEM SOLVER.', 'GROUP MANAGEMENT', 'PROACTIVE, AND HAS STRONG WORK.', 'ETHICS']
  
    const { scroll } = useSpring({
      scroll: (words.length - 1) * 50,
      from: { scroll: 0 },
      reset: true,
      reverse: flip,
      delay: 300,
      config: config.molasses,
      onRest: () => set(!flip),
    })

    const [flips, setFlips] = useState(false)
    const props = useSpring({
      to: { opacity: 1 },
      from: { opacity: 0 },
      reset: true,
      reverse: flips,
      delay: 100,
      config: config.molasses,
      onRest: () => setFlips(!flips),
    })

    return (
        <div className="pt-5 bg-info">
            <div className="container pt-5">
                <h1 id='aboutme' className='text-white'>About Me</h1>
                <div className="row">
                    <div className="col-md-8 pt-5 mt-5 text-white">
                        <p>Experienced with Web Developer skilled in Web Applications, Front-End Development, Back-End Development Web Security. Strong engineering professional with a Diploma focused in Computer Science from Habiganj Polytechnic Institute. - Quick Learner, proactive, and has
                            strong work ethics Group Management and Problem Solver
                        </p>

                            <h1>
                                    <animated.div
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: 50,
                                        overflow: 'auto',
                                        fontSize: '0.5em',
                                    }}
                                    scrollTop={scroll}>
                                    {words.map((word, i) => (
                                        <div
                                        key={`${word}_${i}`}
                                        style={{ width: '100%', height: 50, textAlign: 'center' }}>
                                        {word}
                                        </div>
                                    ))}
                                    </animated.div>
                            </h1>

                        <p> Design and code beautifully simple things, and I love what I do.</p>
                        <p> " You can never understand everything. but you should push yourself to understand the system "</p>
                    </div>
                    <div className="col-md-4">
                        <p><animated.h1 style={props}><img className="w-100 rounded-3" src={AboutMeImage} alt=""/></animated.h1></p>
                    </div>
                </div>
            </div>
        </div>    
    );
};

export default AboutMeSection;