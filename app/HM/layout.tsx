
import ProtectedRoute from "../_protected-route/authorized-access";
import { Navbar } from "./_components/navbar";
import { SideBar } from "./_components/sidebar";

 

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <ProtectedRoute allowedRoles={['hm_boys','hm_girls']}>

    <div className="flex h-screen bg-[#f6f8fc]">
      {/* Sidebar */}
      <SideBar />

      {/* Main area */}
      <div className="ml-64 flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <div className="h-16 flex-shrink-0">
          <Navbar />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
    </ProtectedRoute>
  );
}
