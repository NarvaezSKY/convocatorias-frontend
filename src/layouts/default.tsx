import { Link } from "@heroui/link";
import { Navbar } from "../components/navbar";
import { useState } from "react";
import { Button } from "@heroui/react";
import { HiMenu } from "react-icons/hi";
import { Sidebar } from "../components/sidebar";
import { useAuthStore } from "@/app/shared/auth.store";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthStore();
  const isAuthenticated = !!user;

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 mt-6">
        {isAuthenticated && (
          <Button
            isIconOnly
            className="fixed bottom-4 right-4 z-40 md:hidden"
            variant="solid"
            onClick={() => setSidebarOpen(true)}
          >
            <HiMenu className="w-7 h-7" />
          </Button>
        )}

        {isAuthenticated && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        <main
          className={`flex-grow pt-16 px-6 w-full transition-all ${
            isAuthenticated ? "md:ml-64" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
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
