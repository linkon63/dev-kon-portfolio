import React from 'react';
import { useState } from "react"
import { config, useSpring, animated } from "react-spring"

const Number = () => {
    const [flip, set] = useState(false)
    const { number } = useSpring({
        reset: true,
        reverse: flip,
        from: { number: 1 },
        number: 100,
        delay: 400,
        config: config.molasses,
        onRest: () => set(!flip),
    })

    return (
        <div className='text-light'>
            {/* <Spinner animation="grow" /> */}
            <animated.div>{number.to(n => n.toFixed())}</animated.div>
        </div>
    );
};

export default Number;