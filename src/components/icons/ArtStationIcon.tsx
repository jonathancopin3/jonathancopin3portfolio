import type { ImgHTMLAttributes } from 'react';

interface IconProps extends ImgHTMLAttributes<HTMLImageElement> {
    size?: number | string;
    color?: string;
}

export const ArtStationIcon = ({ size = 24, className = "", ...props }: IconProps) => {
    return (
        <img
            src="/artstation.png"
            alt="ArtStation"
            style={{
                width: size,
                height: size,
                objectFit: 'contain'
            }}
            className={`invert transition-all duration-300 group-hover:invert-0 ${className}`}
            {...props}
        />
    );
};
