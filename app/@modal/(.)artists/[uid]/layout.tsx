import React from "react";
import Modal from "@/components/banner/modal";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Modal>
      <div className="flex flex-col gap-8 bg-white w-1/8 h-1/8 p-8 rounded-lg">
        {children}
      </div>
    </Modal>
  );
}
