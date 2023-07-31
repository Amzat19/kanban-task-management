import React, { useState, useEffect } from 'react';

interface Viewport {
    width: number;
}

const useViewport = (): Viewport => {
    const [viewport, setViewport] = useState<Viewport>({
        width: 0,
    });

    useEffect(() => {
        // Function to update the viewport width
        const handleResize = (): void => {
            setViewport({ width: window.innerWidth });
        }

        // Add event listener to track viewport width on resize
        window.addEventListener('resize', handleResize);

        // Initial viewport width
        handleResize();

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return viewport;
}

export default useViewport