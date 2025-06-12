import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import AccountModal from "./Auth/AccountModal"
import Auth from '../pages/Login';
import { Link } from 'react-router-dom';


export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [checkSign, setCheckSign] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    setCheckSign(!checkSign);
  }, [isSignedIn])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="nav_main" >
      <div className="nav_logo">Veltrix AI</div>
      <div className={`nav_items_wrapper ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav_items">Docs</div>
        <div className="nav_items"><Link to={"/subcription"}>Pricing</Link> </div>
        <div className="nav_login">
          <div className="login_btn">
            {isSignedIn ? (
              <img
                src={user?.imageUrl || "/image.png"} // Fallback to a default profile image
                alt="Profile"
                onClick={() => setIsOpen(true)}
                className="h-10 w-10 rounded-full cursor-pointer"
              />
            ) : (
              <Auth /> // Show Auth component only if the user is not signed in
            )}
          </div>
        </div>
      </div>
      <div className="hamburger_menu" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {/* Account Modal */}
      {isSignedIn && (
        <AccountModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={{
            id: user?.id || "No ID",
            fullName: user?.fullName || "Unknown User", // Fallback to "Unknown User" if fullName is null/undefined
            email: user?.emailAddresses[0]?.emailAddress || "No Email", // Fallback to "No Email"
            imageUrl: user?.imageUrl || "/image.png", // Fallback to a default profile image
          }}
        />
      )}
      <style>
        {`
          .nav_main {
            background-color: rgba(7, 7, 7, 0.2);
            color: white;
            width: 100%;
            height: 112px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 18px 43px;
            position: sticky;
            font-family: "Roboto", sans-serif;
            backdrop-filter: blur(10px);
            top: 0;
            z-index: 1;     
        }

        .nav_logo {
            font-size: 30px;
            font-weight: bold;
        }

        .nav_items_wrapper {
            display: flex;
            gap: 114px;
            align-items: center;
            transition: all 0.3s ease;
        }

        .nav_items {
            font-size: 20px;
            color: white;
            line-height: 150%;
            height: fit-content;
        }

        .nav_login {
            display: flex;
            justify-content: flex-end;
        }

        .login_btn {
            width: 130px;
            height: 55px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            font-size: 18px;
        }

        /* Hamburger Menu */
        .hamburger_menu {
            display: none;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
        }

        .hamburger_menu .bar {
            width: 25px;
            height: 3px;
            background-color: white;
            transition: all 0.3s ease;
        }

        /* Media Queries */
        @media (max-width: 768px) {
            .nav_items_wrapper {
              display: none;
              flex-direction: column;
              gap: 20px;
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              padding: 20px;
              align-items: flex-start;
              padding-left: 10%;
              

            }
          
            .nav_items_wrapper.open {
              display: flex;
              background-color: rgba(0, 0, 0, 0.4);
              backdrop-filter: blur(10px);          /* Enable blur effect */
              -webkit-backdrop-filter: blur(10px);  /* For Safari support */
              z-index: 10000;
            }
          
            .hamburger_menu {
              display: flex;
            }
          
            .login_btn {
              width: 100px;
              height: 40px;
              font-size: 16px;
            }
          }
  
        `}
      </style>
    </div>
  );
};