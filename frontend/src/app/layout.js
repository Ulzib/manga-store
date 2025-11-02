import "./globals.css";
import NavBar from "./components/navi/NavBar.jsx";
import ClientLayout from "./components/navi/ClientLayout";
import ToastProvider from "./components/toast/ToastProvider";
import { TokenProvider } from "./components/navi/TokenLog";

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
          <ClientLayout className="max-w-5xl mx-auto p-6">
            {children}
          </ClientLayout>
        </TokenProvider>
      </body>
    </html>
  );
}
