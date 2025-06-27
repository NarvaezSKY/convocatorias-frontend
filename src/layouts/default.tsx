import { Link } from "@heroui/link";

import { Navbar } from "../components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3 font-semibold border-gray-300 border-t mt-6">
        <Link
          className="flex items-center gap-1 text-current"
          href="https://seguimiento-innovacion-y-competitividad.vercel.app/home"
        >
          <span className="mt-6 mb-4">
            © Seguimiento Innovación y Competitividad -{" "}
            <strong className="text-success">SENA</strong> Regional Cauca - 2025
          </span>
        </Link>
      </footer>
    </div>
  );
}
