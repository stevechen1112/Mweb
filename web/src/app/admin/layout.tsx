import { AuthProvider } from "@/components/AuthProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="bg-neutral-950 text-white min-h-screen">{children}</div>
    </AuthProvider>
  );
}
