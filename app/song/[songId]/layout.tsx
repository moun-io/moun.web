import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="Box">
      <div className="flex flex-col lg:flex-row h-full mt-0 lg:mt-40 mb-40 gap-16 lg:px-4">
        {children}
      </div>
    </div>
  );
}
