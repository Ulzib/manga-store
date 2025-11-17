import "./globals.css";
import ToastProvider from "../components/toast/ToastProvider";
import { TokenProvider } from "../components/navi/TokenLog";

export const metadata = {
  title: "Book Store",
  description: "A simple Next.js book app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <TokenProvider>
          <ToastProvider />
          {children} {/* ClientLayout устгах */}
        </TokenProvider>
      </body>
    </html>
  );
}
