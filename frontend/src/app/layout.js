import "./globals.css";
import ToastProvider from "../components/toast/ToastProvider";
import { TokenProvider } from "../components/navi/TokenLog";
import { CartProvider } from "@/context/CartContext";
import UserNavBar from "@/components/user/UserNavBar";

export const metadata = {
  title: "Book Store",
  description: "A simple Next.js book app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <TokenProvider>
          <CartProvider>
            <ToastProvider />
            {children}
          </CartProvider>
        </TokenProvider>
      </body>
    </html>
  );
}
