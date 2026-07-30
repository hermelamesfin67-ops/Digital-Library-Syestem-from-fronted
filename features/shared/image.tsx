import React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}
const ImagePreview = ({ src, alt, ...props }: Props) => {
  //we are using normal html image tag instead of next/image because next/image we are getting issue while optimizing the image and is not shown on local premise server
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" {...props} />;
};

export default ImagePreview;
