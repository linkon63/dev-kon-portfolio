import React, { useState } from 'react';
import { config, useSpring, animated } from 'react-spring';

const Text = () => {
    const [flip, set] = useState(false)
    const props = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0 },
        reset: true,
        reverse: flip,
        delay: 200,
        config: config.molasses,
        onRest: () => set(!flip),
    })
    return (    
        <animated.h5 style={props}>hireME!</animated.h5>
    );
};

export default Text;

// function Text() {
//     const [flip, set] = useState(false)
//     const props = useSpring({
//         to: { opacity: 1 },
//         from: { opacity: 0 },
//         reset: true,
//         reverse: flip,
//         delay: 200,
//         config: config.mol  asses,
//         onRest: () => set(!flip),
//     })

//     return <animated.h1 style={props}>hello</animated.h1>
// }