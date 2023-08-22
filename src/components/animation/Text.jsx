import React, { useState } from 'react';
import { config, useSpring, animated } from 'react-spring';

const Text = ({ inComing }) => {
    const [flip, set] = useState(false)
    const props = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0 },
        reset: true,
        reverse: flip,
        delay: 100,
        config: config.molasses,
        onRest: () => set(!flip),
    })
    return (
        <animated.div style={props}>
            {/* hireME! */}
            {
                inComing ?
                    inComing
                    : <h5>hireME</h5>
            }
            {/* {
                inComing ?
                    inComing
            } */}
        </animated.div>
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