// VendorLayout - Vendor dashboard layout wrapper
import React from "react";
import VendorSidebar from "./VendorSidebar";

export const VendorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <VendorSidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {children}
      </main>
    </div>
  );
};

export default VendorLayout;