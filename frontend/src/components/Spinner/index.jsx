"use client";

export default function Spinner({ size = "md" }) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-4",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div>
      <div
        className={`${sizes[size]} border-gray-300 border-t-blue-800 rounded-full animate-spin`}
      />
    </div>
  );
}
