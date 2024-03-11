"use client";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { mainLinks } from "@/constants";
import { userLinks } from "@/constants";
import { User } from "@prisma/client";

//icons
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { TbBracketsAngle } from "react-icons/tb";
import CartIcon from "@/app/(shoppingcart)/components/ui/CartIcon";
import WishlistIcon from "@/app/(wishlist)/components/WishlistIcon";
import getCurrentUser from "@/app/(auth)/actions/getCurrentUser";
import { useShoppingCart } from "use-shopping-cart";

interface NavbarProps {
  user: User;
}

const Navbar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { cartDetails, removeItem } = useShoppingCart();
  const items = Object.values(cartDetails ?? {});
  const { data: session } = useSession();
  const user = session;

  const mobileMenuHandler = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const userMenuHandler = () => {
    setOpenUserMenu(!openUserMenu);
  };
  return (
    <nav>
      <div className="main-container w-full border-b border-1 flex justify-between items-center py-4 px-4 md:py-6">
        <Link href={"/"}>
          <div className="flex gap-1 items-center text-xl font-medium text-black">
            <h1>T-Shirts</h1>
            <TbBracketsAngle />
          </div>
        </Link>

        <ul className="flex gap-10 max-md:hidden">
          {mainLinks.map((link, index) => (
            <Link key={index} href={link.route}>
              <li>{link.label}</li>
            </Link>
          ))}
        </ul>

        <div className="flex items-center gap-5 text-xl [&>*]:cursor-pointer">
          <CartIcon />
          <WishlistIcon />
          <div className="max-md:hidden" onClick={userMenuHandler}>
            {user ? (
              openUserMenu ? (
                <MdClose onClick={userMenuHandler} />
              ) : (
                <AiOutlineUser />
              )
            ) : (
              <Link href={"/sign-in"}>
                <button className="bg-slate-700 text-base text-white px-3 py-1">
                  Log In
                </button>
              </Link>
            )}
          </div>
          <div className="md:hidden" onClick={mobileMenuHandler}>
            {openMobileMenu ? <MdClose /> : <FiMenu />}
          </div>
        </div>

        {/* USER MENU */}
        {openUserMenu && user && (
          <div className="z-10 absolute right-10 top-[40px] w-28 bg-gray-700 shadow-md rounded-md p-4 text-white max-md:hidden text-center">
            {
              <ul>
                {userLinks.map((link, index) => (
                  <Link
                    onClick={() => setOpenUserMenu(false)}
                    key={index}
                    href={link.route}
                  >
                    <li>{link.label}</li>
                  </Link>
                ))}
                <li
                  className="cursor-pointer"
                  onClick={() => {
                    for (let i = 0; i < items.length; i++) {
                      removeItem(items[i].id);
                    }
                    signOut();
                  }}
                >
                  Sign Out
                </li>
              </ul>
            }
          </div>
        )}
      </div>

      {/* MOBILE MENU */}
      {openMobileMenu && (
        <div className="md:hidden">
          <div className="absolute right-5 w-48 bg-gray-700 py-5 shadow-md rounded-md p-4 text-white text-center z-[99999]">
            <ul className="flex flex-col gap-5">
              {mainLinks.map((link, index) => (
                <Link key={index} href={link.route}>
                  <li>{link.label}</li>
                </Link>
              ))}
              {!user ? (
                <>
                  <Link href={"/sign-in"}>
                    <li>Log In</li>
                  </Link>
                </>
              ) : (
                <>
                  {userLinks.map((link, index) => (
                    <Link key={index} href={link.route}>
                      <li>{link.label}</li>
                    </Link>
                  ))}
                  <li
                    className="cursor-pointer"
                    onClick={() => {
                      for (let i = 0; i < items.length; i++) {
                        removeItem(items[i].id);
                      }

                      signOut();
                    }}
                  >
                    Sign Out
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
