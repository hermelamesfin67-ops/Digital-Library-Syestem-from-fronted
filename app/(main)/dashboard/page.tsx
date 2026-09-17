export default function Home() {
  return (
    <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {[1, 2, 3, 4, 5].map((_, i) => (
        <div key={i} className="block rounded border bg-white p-4 shadow hover:shadow-md h-40" />
      ))}
    </div>
  );
}
