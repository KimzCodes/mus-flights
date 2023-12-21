import { useState, useEffect } from "react";

const useResponsiveLayout = () => {
  const [screenSize, setScreenSize] = useState("large"); // Default to large screen

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 600) {
        setScreenSize("small");
      } else if (screenWidth >= 600 && screenWidth < 1024) {
        setScreenSize("medium");
      } else {
        setScreenSize("large");
      }
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { screenSize };
};

export default useResponsiveLayout;
