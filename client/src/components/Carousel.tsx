import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

type Item = {
  id: number;
  image: string;
  width: number;
};

const CarouselComponent = () => {
  const [activeSlide, setActiveSlide] = useState<number>(2);

  const items: Item[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      width: 350,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      width: 370,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      width: 370,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      width: 370,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      width: 350,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      width: 350,
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      width: 370,
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    variableWidth: true,
    beforeChange: (_current: number, next: number) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "50px",
        },
      },
    ],
  };

  return (
    <div style={{ background: "#0C0C0F", padding: "60px 0", width: "100%", overflow: "hidden" }}>
      <div style={{ maxWidth: "100%", margin: "0 auto", textAlign: "center" }}>
        <div className="carousel-container">
          <Slider {...settings}>
            {items.map((item, index) => {
              const isActive = activeSlide === index;

              return (
                <div key={item.id} className="slide-wrapper">
                  <div
                    className="slide-card"
                    style={{
                      width: item.width,
                      height: 230,
                      borderRadius: "10px",
                      overflow: "hidden",
                      transition: "all 0.5s ease",
                      transform: `scale(${isActive ? 1.05 : 0.95})`,
                      opacity: isActive ? 1 : 0.8,
                    }}
                  >
                    <img
                      src={item.image}
                      alt={`Slide ${item.id}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>

      {/* Replace jsx style with regular <style> tag and suppress JSX attribute issue */}
      <style>{`
        .carousel-container {
          margin: 0 auto;
        }

        .slide-wrapper {
          padding: 10px;
          box-sizing: border-box;
          display: flex !important;
          justify-content: center;
          align-items: center;
        }

        .slick-track {
          display: flex !important;
          align-items: center !important;
        }

        .slick-slide {
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .slide-card {
            width: 280px !important;
            height: 200px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CarouselComponent;
