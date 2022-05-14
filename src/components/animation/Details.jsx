import React, { useState } from 'react';
import { config, useSpring, animated } from "react-spring";

const Details = () => {
    const [flip, set] = useState(false)

    const words = ['I', 'am.', 'here', 'to.', 'help', 'you']

    const { scroll } = useSpring({
        scroll: (words.length - 1) * 50,
        from: { scroll: 0 },
        reset: true,
        reverse: flip,
        delay: 300,
        config: config.molasses,
        onRest: () => set(!flip),
    })
    return (
        <animated.div
            style={{
                position: 'relative',
                width: '100%',
                height: 50,
                overflow: 'hidden',
                fontSize: '40px',
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
    );
};

export default Details;