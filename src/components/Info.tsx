import { BiWorld } from "react-icons/bi";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { GiTrophy } from "react-icons/gi";

const Info = () => {
  return (
    <section className="mt-2 py-5 w-full">
      <div className="main-container grid grid-cols-2 gap-2 md:flex justify-evenly">
        <div className="flex  gap-2 uppercase text-sm">
          <BiWorld className="text-xl md:text-3xl" />
          <span>Free Shipping</span>
        </div>
        <div className="flex  gap-2 uppercase text-sm">
          <FaArrowRotateLeft className="text-xl md:text-3xl" />
          <span>Money Back Guarenteed</span>
        </div>
        <div className="flex  gap-2 uppercase text-sm">
          <FaLock className="text-xl md:text-3xl" />
          <span>Secure Online Payments</span>
        </div>
        <div className="flex  gap-2 uppercase text-sm">
          <GiTrophy className="text-xl md:text-3xl" />
          <span>Best Premium Quality</span>
        </div>
      </div>
    </section>
  );
};

export default Info;
