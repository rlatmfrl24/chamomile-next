import BlogMenu from "./components/menu";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex-1 flex flex-col">
      <div className="justify-center flex flex-grow flex-auto h-0 overflow-auto bg-slate-900 text-white">
        <BlogMenu />
        {children}
      </div>
    </section>
  );
}
