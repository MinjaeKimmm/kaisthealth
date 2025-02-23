import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Carousel.css";

import arrowLeft from "../../assets/arrow-left.svg";
import arrowRight from "../../assets/arrow-right.svg";

interface Props {
  slides: string[];
}

function Carousel({ slides }: Props) {
  return (
    <div className="carousel-container">
      <Swiper
        modules={[EffectCoverflow, Navigation, Pagination]}
        navigation={{
          prevEl: ".carousel-container .carousel-button-prev",
          nextEl: ".carousel-container .carousel-button-next",
        }}
        pagination={{
          clickable: true,
        }}
        speed={1000}
        slidesPerView={"auto"}
        centeredSlides
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="carousel-slide">
            <img src={slide} alt="" />
          </SwiperSlide>
        ))}
        <div className="carousel-button-prev">
          <img src={arrowLeft} alt="Left" />
        </div>
        <div className="carousel-button-next">
          <img src={arrowRight} alt="Right" />
        </div>
      </Swiper>
    </div>
  );
}

export default Carousel;
