import React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const ImagePreview = ({ src, alt, ...props }: Props) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      {...props}
    />
  );
};

export default ImagePreview;