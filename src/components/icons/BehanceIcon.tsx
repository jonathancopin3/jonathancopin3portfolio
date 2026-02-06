import type { ImgHTMLAttributes } from 'react';

interface IconProps extends ImgHTMLAttributes<HTMLImageElement> {
    size?: number | string;
    color?: string; // Lucide icons accept color, though we might ignore it for an image unless we filter
}

export const BehanceIcon = ({ size = 24, className = "", ...props }: IconProps) => {
    return (
        <img
            src="/behance.png"
            alt="Behance"
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
