"use client";
import AOS from "aos";
import Image from "next/image";
import { useEffect } from "react";

const Banner = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <section className="main-container overflow-hidden flex justify-center my-5">
      <div
        data-aos="flip-right"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <Image
          src={"/banner-image.png"}
          width={1400}
          height={500}
          alt="shirt banner"
        />
      </div>
    </section>
  );
};

export default Banner;
