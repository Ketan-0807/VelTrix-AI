import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import CarouselComponent from "../components/Carousel";
import { Features } from "../components/Features";
import Orb from "../components/OrbBtn";
import axios from "axios";
import { BACKEND_URL } from '../config';

export const Home = () => {
  const [isServerOffline, setIsServerOffline] = useState(false);

  // Function to check if the server is online
  const checkServerStatus = async () => {
    try {
      await axios.get(`${BACKEND_URL}/health`);
      setIsServerOffline(false); // Server is online
    } catch (error) {
      console.error("Server is offline:", error);
      setIsServerOffline(true); // Server is offline
    }
  };

  useEffect(() => {
    // Check server status immediately
    checkServerStatus();

    // Set up an interval to check server status every 5 seconds
    const interval = setInterval(() => {
      checkServerStatus();
    }, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div style={{ backgroundColor: "#0C0C0F" }}>
        <Navbar />
        {isServerOffline && (
          <div
            style={{
              backgroundColor: "red",
              color: "white",
              textAlign: "center",
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            The server is currently offline. Please try again later.
          </div>
        )}
        <div className="Home_container">
          <div className="home_heading">
            Making of Incredible <br />
            <p> with Ease</p>
          </div>
          <div className="home_para">
            We're committed to improving the lives of as many people as
            possible. And we will continue to responsibly build products and
            platforms powered by the most advanced technology for billions of
            people around the world.
          </div>

          <div className="carousel_wrapper">
            <CarouselComponent />
          </div>
          <div className="features_wrapper" style={{ width: "100%" }}>
            <Features />
          </div>
          <div className="get_start_wrapper">
            <div className="get_start_heading">
              Wants to give <br />
              <p>a shot ?</p>{" "}
            </div>
            <div
              className="orb_wrapper"
              style={{ position: "relative", cursor: "pointer" }}
            >
              <div
                style={{ width: "100%", height: "800px", position: "relative" }}
              >
                {/* Add the text overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                    color: "white",
                    fontSize: "48px",
                    fontWeight: "bold",
                    textAlign: "center",
                    pointerEvents: "none", // This makes the text not interfere with mouse events
                  }}
                >
                  Get Started.
                </div>
                <Orb
                  hoverIntensity={0.5}
                  rotateOnHover={true}
                  hue={0}
                  forceHoverState={false}
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @font-face {
          font-family: "Custom";
          src: url("/fonts/playfair-display.italic.ttf") format("truetype");
        }
        .Home_container {
          display: flex;
          width: 100%;
          color: white;
          justify-content: center;
          align-items: center;
          font-family: "Roboto", sans-serif;
          flex-direction: column;
          gap: 28px;
        }

        .home_heading {
          font-weight: bold;
          font-size: 94px;
        }
        .home_heading p {
          font-weight: bold;
          font-size: 94px;
          font-family: "Custom", sans-serif;
          color: rgba(194, 188, 175, 1);
          font-style: italic;
          font-weight: 1;
          display: flex;
          justify-content: center;
        }

        .home_para {
          max-width: 610px;
          min-width: 350px;
          font-weight: bolder;
          display: flex;
          text-align: center;
        }
        .carousel_wrapper {
          width: 100%;
          margin: 0 auto;
        }

        .get_start_wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }

        .get_start_heading {
          font-weight: bold;
          font-size: 94px;
          text-align: center;
        }
        .get_start_heading p {
          color: #cec9ff;
          font-family: "Custom", sans-serif;
          font-style: italic;
        }
        @media (max-width: 1200px) {
          .home_heading {
            font-size: 72px;
          }

          .home_heading p {
            font-size: 72px;
          }

          .get_start_heading {
            font-size: 72px;
          }
        }

        @media (max-width: 768px) {
          .home_heading {
            font-size: 48px;
          }

          .home_heading p {
            font-size: 48px;
          }

          .home_para {
            max-width: 90%;
            font-size: 16px;
          }

          .get_start_heading {
            font-size: 48px;
          }
        }
        @media (max-width: 480px) {
          .home_heading {
            font-size: 36px;
          }

          .home_heading p {
            font-size: 36px;
          }

          .home_para {
            font-size: 14px;
          }

          .get_start_heading {
            font-size: 36px;
          }
        }
      `}</style>
    </>
  );
};