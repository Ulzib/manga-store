import BackgroundPic from "./BackPic";

// app/(auth)/layout.jsx
export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <BackgroundPic />
      {children}
    </div>
  );
}
