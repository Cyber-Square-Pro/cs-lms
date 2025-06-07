import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Square,
  ClipboardList,
  BarChart2,
  Table,
  Image,
  Users,
  ShieldAlert,
  BookOpen,
  User,
  UserPlus,
  Eye,
} from "lucide-react";

export const SideBar = () => {

  const logo =
    process.env.NEXT_PUBLIC_LOCAL_ASSET_BASE_URL + "cspro-logo.jpeg";
    
    const menuItems = [
        {
          label: "Dashboard",
          href: "/lms-admin",
          icon: LayoutDashboard,
        },
        {
          group: "Students",
          children: [
            { label: "Add", href: "/teacher/student/add", icon: UserPlus },
            { label: "View", href: "/teacher/student//view", icon: Eye },
          ],
        },
         
      ];
    
  return (
    <aside className="w-64 bg-white shadow-lg fixed h-full flex flex-col">
      <div className="p-6 border-b">
               <img src={logo} alt="Logo" className="w-32" />

      </div>
      <nav className="flex-1 p-4">
      <ul className="space-y-4 text-sm font-medium text-gray-700">
          {menuItems.map((item, index) =>
            item.group ? (
              <li key={index}>
                <div className="uppercase text-xs font-semibold text-gray-500 px-2 mb-1">
                  {item.group}
                </div>
                <ul className="space-y-1 pl-4">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <Link
                        href={child.href}
                        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                      >
                        <child.icon size={16} />
                        <span>{child.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href || "#"}
                  className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
                >
                  {item.icon && <item.icon size={18} />}
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </aside>
  );
};
