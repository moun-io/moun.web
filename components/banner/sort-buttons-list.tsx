import React from "react";

export default function SortButtonList({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex w-full justify-between px-4">{children}</div>;
}
