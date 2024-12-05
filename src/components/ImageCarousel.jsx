import React from "react";
import Slider from "react-slick";
import { CarouselContainer, CarouselImage, CarouselWrapper, CarouselTitle } from "../styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
    "/images/cabbage-field.jpg",
    "/images/lettuce-field.jpg",
    "/images/strawberry-field.jpg",
];

const ImageCarousel = () => {
    const  settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };


    return (
        <CarouselWrapper>
            <CarouselTitle>Current Plant Images</CarouselTitle>
            <CarouselContainer>
                <Slider {...settings}>
                    {images.map((src, index) => (
                        <CarouselImage key={index} src={src} alt={`Slide ${index + 1}`} />
                    ))}
                </Slider>
            </CarouselContainer>
        </CarouselWrapper>
    );
};

export default ImageCarousel;
