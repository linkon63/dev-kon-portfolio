import React from 'react';
import { useSpring, animated } from 'react-spring';
import HeaderNav from '../../Shared/HeaderNav/HeaderNav';
import HomeMain from '../HomeMain';

const HookedComponent = () => {
    const [props] = useSpring({
        opacity: 1,
        color: 'white',
        from: { opacity: 0 },
        delay: '1000'
    })
    return <animated.div style={props}> 

     </animated.div>
}

export default HookedComponent;
