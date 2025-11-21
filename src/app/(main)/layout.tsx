import Header from "@/components/custom/header";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#18181B] text-white">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
};

export default MainLayout;
