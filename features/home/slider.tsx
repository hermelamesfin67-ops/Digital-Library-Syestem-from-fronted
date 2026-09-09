"use client"
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image from "../../public/library.jpeg"
import image1 from "../../public/library1.jpeg"
import image2 from "../../public/library2.jpeg"
import Image from "next/image";

const images = [image, image1, image2]

function SampleNextArrow() {
    return (
        <div />
    );
}

function SamplePrevArrow() {
    return (
        <div />
    );
}

function HeroSlider() {

    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className="slider-container">
            <Slider {...settings} className="space-x-3">
                {images?.map((image, i) => (
                    <div key={i} className="h-72">
                        <Image src={image} alt="Image"
                            width={100}
                            height={100}
                            className="flex items-center justify-center w-full h-full" />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default HeroSlider