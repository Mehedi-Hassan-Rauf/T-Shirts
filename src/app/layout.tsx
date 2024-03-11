import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import AuthContext from "@/context/AuthContext";
import getCurrentUser from "./(auth)/actions/getCurrentUser";
import ToasterContext from "@/context/HotToastContext";
import CartContext from "@/context/CartContext";
import Footer from "@/components/Footer";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "T-Shirts",
  description: "E-commerce Website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${raleway.className} min-h-screen max-w-screen flex flex-col justify-between`}
        suppressHydrationWarning={true}
      >
        <AuthContext>
          <CartContext>
            <ToasterContext />
            <Navbar />
            {children}
            <Footer />
          </CartContext>
        </AuthContext>
      </body>
    </html>
  );
}
