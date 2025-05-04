import "../globals.css";
import { Navbar } from "./_components/navbar";
import { SideBar } from "./_components/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <div className="flex h-screen bg-[#f6f8fc]">
    {/* Sidebar */}
    <SideBar   /> {/* Set a fixed width for the sidebar */}
  
    {/* Main area */}
    <div className="flex-1 flex flex-col">
      {/* Top Navbar */}
      <Navbar />
  
      {/* Page Content */}
      <main className="p-6 mt-16">{children}</main>
    </div>
  </div>
  
  );
}
