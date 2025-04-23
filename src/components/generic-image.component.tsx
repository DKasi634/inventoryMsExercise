import { MissingItemImage } from "@/assets";
import React, { useEffect, useState } from "react";

interface GenericImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
    hasShimmerEffect?: boolean
}

const GenericImage: React.FC<GenericImageProps> = ({
    src = MissingItemImage, fallbackSrc = MissingItemImage, hasShimmerEffect = true, alt = "", className = "", ...rest
}) => {
    const [imageSrc, setImageSrc] = useState<string>(MissingItemImage);

    const handleError = (_: React.SyntheticEvent<HTMLImageElement, Event>) => {
        // setLoading(false);
        setImageSrc(fallbackSrc);
    };

    useEffect(() => {
        if(src){
            setImageSrc(src);
        }
        // setLoading(true)
    }, [src])

    return (
        <>
        <img src={imageSrc} alt={alt} className={className} onError={handleError} {...rest} />
        </>
    )
}

export default GenericImage;