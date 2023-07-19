export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex-1 flex flex-col">
      <div className="justify-center flex-grow flex-auto h-0 overflow-auto bg-slate-900 text-white">
        <div className="bg-red-600 min-w-fit">
          <h1>Menu</h1>
        </div>
        {children}
      </div>
    </section>
  );
}
