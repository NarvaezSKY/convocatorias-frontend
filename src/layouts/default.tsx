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
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          className="flex items-center gap-1 text-current"
          href="https://seguimiento-innovacion-y-competitividad.vercel.app/home"
        >
          <span>
            © Seguimiento Innovación y Competitividad -{" "}
            <span className="font-bold">SENA</span> Regional Cauca - 2025
          </span>
        </Link>
      </footer>
    </div>
  );
}
