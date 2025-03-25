"use client";
import React, { useState, useEffect } from "react";

const features = [
  { img: "trophy.png", title: "High Quality", description: "Crafted from top materials" },
  { img: "guarantee.png", title: "Warranty Protection", description: "Over 2 years" },
  { img: "shipping.png", title: "Free Shipping", description: "Order over 150 $" },
  { img: "customer-support.png", title: "24/7 Support", description: "Dedicated support" },
];

const BlackBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Start with default value

  useEffect(() => {
    // Ensure this runs only in the browser
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    checkScreenSize(); // Set initial state
    window.addEventListener("resize", checkScreenSize);

    // Auto-switching feature every 5 seconds (only on small/medium screens)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="bg-black h-[14rem] mt-14 absolute bottom-0 right-0 left-0">
      <div className={`flex ${isSmallScreen ? "justify-center items-center" : "justify-between space-x-4"} h-full`}>
        {isSmallScreen ? (
          <div className="flex flex-col items-center text-center">
            <img src={features[currentIndex].img} alt={features[currentIndex].title} className="h-16 w-[4.5rem] mb-2 " />
            <span className="text-drkyellow text-xl font-bold">{features[currentIndex].title}</span>
            <span className="text-lg text-cusGray">{features[currentIndex].description}</span>
          </div>
        ) : (
          features.map((feature, index) => (
            <div key={index} className="flex items-center pr-4">
              <div>
                <img src={feature.img} alt={feature.title} className="h-16 w-[4.5rem] pl-2 pr-2" />
              </div>
              <div className="flex flex-col">
                <span className="text-drkyellow text-xl font-bold">{feature.title}</span>
                <span className="text-lg text-cusGray">{feature.description}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlackBar;
