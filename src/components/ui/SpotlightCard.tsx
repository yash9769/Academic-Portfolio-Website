import React, { useRef } from 'react';
import './SpotlightCard.css';

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
    [key: string]: any;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
    children,
    className = '',
    spotlightColor = 'rgba(139, 69, 19, 0.15)', // Defaulting to a subtle brown/gold to match theme
    ...props
}) => {
    const divRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        divRef.current.style.setProperty('--mouse-x', `${x}px`);
        divRef.current.style.setProperty('--mouse-y', `${y}px`);
        divRef.current.style.setProperty('--spotlight-color', spotlightColor);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            className={`card-spotlight ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default SpotlightCard;
