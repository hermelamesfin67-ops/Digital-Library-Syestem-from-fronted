"use client"
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImagePreview from "../shared/image";

const images = ["/library.jpeg", "/library1.jpeg", "/library2.jpeg"]


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
                        <ImagePreview src={image} alt="Image"
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