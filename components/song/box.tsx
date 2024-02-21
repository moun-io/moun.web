export default function Box({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className=" border-solid border rounded-xl w-full p-8 flex flex-col gap-4">
      <h2 className="text-neutral-500 font-bold">{title}</h2>
      {children}
    </div>
  );
}
