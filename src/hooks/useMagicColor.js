import React, { useEffect, useState } from 'react';

function useMagicColor(props) {
    const [color, setColor] = useState('');

    function randomColor() {
        return 'green';
    }

    //change color every 1 second
    useEffect(() => {
        const colorInterval = setInterval(() => {
            const newColor = randomColor();
            setColor(newColor);
        })

        return () => {
            clearInterval(colorInterval);
        }
    }, []);

    return color;
}

export default useMagicColor;