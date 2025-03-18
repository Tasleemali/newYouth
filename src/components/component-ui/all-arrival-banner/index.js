import Link from "next/link";
import { useEffect, useState } from "react";

const AllNewArrival = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const desktopImage = "/image/image3.jpg";
  const mobileImage = "/image/img2.jpg";
  const bannerLink = "/category/new-arrivals";

  return (
    <div className="w-full h-auto relative overflow-hidden">
      <Link href={bannerLink}>
        <img
          src={isMobile ? mobileImage : desktopImage}
          alt="Banner"
          className="w-full h-full object-cover cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default AllNewArrival;