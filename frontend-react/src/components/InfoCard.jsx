export default function InfoCard({
  title,
  children,
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-xl">

      <h2 className="text-2xl font-bold mb-6">
        {title}
      </h2>

      {children}

    </div>
  );
}