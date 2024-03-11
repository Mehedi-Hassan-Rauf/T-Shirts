"use client";

import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaSquareSnapchat,
} from "react-icons/fa6";
import { TbBracketsAngle } from "react-icons/tb";
import { FaFacebookSquare } from "react-icons/fa";
import Image from "next/image";
import { mainLinks } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full overflow-hidden py-5 bg-gray-900 mt-10">
      <div className="main-container">
        <div className="py-5 mb-5 border-b border-gray-300 border-opacity-20 flex justify-between items-start">
          <div className="flex flex-1 gap-1 items-center text-lg font-medium text-white">
            <h1>T-Shirts</h1>
            <TbBracketsAngle />
          </div>

          <ul className="flex flex-col w-fit md:flex-row items-end gap-1 md:gap-8 text-xs text-white">
            {mainLinks.map((link, index) => (
              <Link key={index} href={link.route}>
                <li>{link.label}</li>
              </Link>
            ))}
          </ul>
          {/* <div className="flex gap-5 text-white flex-1 justify-end text-2xl">
            <FaSquareXTwitter />
            <FaFacebookSquare />
            <FaSquareInstagram />
            <FaSquareSnapchat />
          </div> */}
        </div>

        <div className="w-full text-center text-sm text-white flex flex-col gap-5 md:flex-row justify-center items-center">
          <span>All Rights Reserved t-shirts-rauf.vercel.com</span>

          <Image
            src={"/payment-getways.png"}
            width={300}
            height={100}
            alt="accepted payments"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
