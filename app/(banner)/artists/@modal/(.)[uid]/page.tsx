import React from "react";

export default function page({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return <div className="absolute bg-neutral-700/80 ">{params.uid}</div>;
}
