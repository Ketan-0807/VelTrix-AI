import React, { useState } from 'react'

export const Features = () => {
  // Array of feature data
  const featuresData = [
    {
      id: 1,
      heading: "Write Code with Ease",
      text: "An intuitive and distraction-free code editor that supports syntax highlighting, auto-complete, and multiple languages",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475" // Use your actual image paths
    },
    {
      id: 2,
      heading: "Live Preview",
      text: "As you write your code, see the results instantly in a live preview pane. No need to refresh or open another window. Perfect for testing UI changes, animations, or frontend logic on the go..",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" // Use your actual image paths
    },
    {
      id: 3,
      heading: "Online Editor",
      text: "Work from anywhere, on any device. The online IDE runs entirely in your browser—no setup, no installs. Just open the link and start coding.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" // Use your actual image paths
    },
    {
      id: 4,
      heading: "Auto Save & Sync",
      text: "Your work is continuously saved in the background. Whether your browser crashes or you switch devices, your code remains intact and synced to your account securely.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475" // Use your actual image paths
    }
  ];

  // State to track which feature is active
  const [activeFeature, setActiveFeature] = useState(1);

  // Handler to toggle feature visibility
  const handleFeatureClick = (featureId) => {
    setActiveFeature(featureId);
  };

  return (
    <>
        <div className="feature_main">
            <div className="features_info_wrapper">
              <div className="features_info">
                {featuresData.map((feature, index) => (
                  <React.Fragment key={feature.id}>
                    <div 
                      className={`features_items ${activeFeature === feature.id ? 'active' : ''}`}
                      onClick={() => handleFeatureClick(feature.id)}
                    >
                      <div className="features_heading">{feature.heading}</div>
                      {activeFeature === feature.id && (
                        <div className="features_text" style={{fontSize:"15px"}}>
                          {feature.text}
                        </div>
                      )}
                    </div>
                    {index < featuresData.length - 1 && <div className="features_line"></div>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="features_img">
                <img 
                  src={featuresData.find(f => f.id === activeFeature).image} 
                  alt={featuresData.find(f => f.id === activeFeature).heading}
                  className="feature-image"
                />
            </div>
        </div>
        <style>
          {`
            .feature_main{
                display: flex;    
                gap: 159px;
                align-items: center;
                justify-content: center;
                padding-left: 5%;
                width: 100%;
            }
            .features_info_wrapper{
                display: flex;
                justify-content: center;
                width: 100%;
            }
            .features_info{
                display: flex;
                flex-direction: column;
                /* max-width: 492px; */
                justify-content: center;
                gap: 15px;

            }
            .features_items{
                font-family: "Roboto",sans-serif;
                display: flex;
                flex-direction: column;
                max-width: 379px;
                gap: 22px;
                cursor: pointer;
                transition: all 0.3s ease;
                padding: 8px;
                border-radius: 4px;
            }

            /* Add hover effect for feature items */

            /* Style for active feature item */


            .features_img{
                width: 100%;
                /* max-width: 757px; */
                max-height: 667px;
                display: flex;
                justify-content: end;
                
            }
            .features_img img{
                max-width: 757px;
                height: 667px;
                transition: transform 0.5s ease, opacity 0.5s ease;
            }

            /* Add image transition effect */
            .feature-image {
                animation: fadeIn 0.5s ease-in-out;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            .features_line{
                height: 1px;
                margin: 10px 0;
                opacity: 0.5;
                background-color: #fff;
                width: 100%;
                transition: opacity 0.3s ease;
            }

            .features_heading{
                font-size: 35px;
                transition: color 0.3s ease;
            }


            .features_text{
                letter-spacing: 0.1vh;
                overflow: hidden;
                max-height: 0;
                opacity: 0;
                transition: max-height 0.5s ease, opacity 0.5s ease;
                animation: slideDown 0.5s ease forwards;
            }

            /* Add text slide-down animation */
            @keyframes slideDown {
                from {
                    max-height: 0;
                    opacity: 0;
                }
                to {
                    max-height: 200px;
                    opacity: 1;
                }
            }

            /* Responsive Design for Tablet and Mobile */
            @media (max-width: 991px) {
                .feature_main {
                  flex-direction: column;
                  gap: 30px;
                  padding: 20px;
                }
              
                .features_img {
                  display: none; /* Hide image on tablets and mobiles */
                }
              
                .features_info {
                  max-width: 100%;
                  align-items: center;
                }
              
                .features_heading {
                  font-size: 28px;
                  text-align: center;
                }
              
                .features_text {
                  text-align: center;
                }
              
                .features_items {
                  max-width: 100%;
                  align-items: center;
                }
              
                .features_line {
                  width: 80%;
                }
              }
  
          `}
        </style>
    </>
  )
}