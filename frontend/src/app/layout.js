import "./globals.css";
import ToastProvider from "../components/toast/ToastProvider";
import { TokenProvider } from "../components/navi/TokenLog";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});
export const metadata = {
  title: "Panel | Book store",
  description: "Манга болон комик номын онлайн дэлгүүр",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} ${montserrat.variable} font-sans bg-gray-900 text-white`}
      >
        <TokenProvider>
          <WishlistProvider>
            <CartProvider>
              <ToastProvider />

              {children}
            </CartProvider>
          </WishlistProvider>
        </TokenProvider>
      </body>
    </html>
  );
}
