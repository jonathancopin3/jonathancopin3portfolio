import React from 'react';

interface CursorProps {
    x: number;
    y: number;
    clicked?: boolean;
    visible?: boolean;
}

export const Cursor: React.FC<CursorProps> = ({ x, y, clicked = false, visible = true }) => {
    if (!visible) return null;

    const cursorStyle: React.CSSProperties = {
        position: 'absolute',
        left: 0,
        top: 0,
        transform: `translate(${x}px, ${y}px) scale(${clicked ? 0.8 : 1})`,
        pointerEvents: 'none',
        zIndex: 1000,
        filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.3))',
        transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)',
    };

    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={cursorStyle}
        >
            <path
                d="M6 3L14.5 28L19.5 19L28.5 19L6 3Z"
                fill="black"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    );
};
