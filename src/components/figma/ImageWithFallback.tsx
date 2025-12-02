import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}

export function ImageWithFallback({ src, fallbackSrc = 'https://via.placeholder.com/400', alt, ...props }: ImageWithFallbackProps) {
    const [imgSrc, setImgSrc] = useState(src);

    const onError = () => {
        setImgSrc(fallbackSrc);
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            onError={onError}
            {...props}
        />
    );
}
