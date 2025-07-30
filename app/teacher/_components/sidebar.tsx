"use client";
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
  Notebook,
  LogOut,
} from "lucide-react";

export const SideBar = () => {
  
  function handleLogout() {
    localStorage.removeItem("class");
    localStorage.removeItem("division");
    localStorage.removeItem("userToken");
    localStorage.removeItem("currentUserRole");
    window.location.href = "/";
  }

  const logo = process.env.NEXT_PUBLIC_LOCAL_ASSET_BASE_URL + "cspro-logo.jpeg";

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

    {
      group: "Academics",
      children: [
        {
          label: "Upload Notes",
          href: "/teacher/academic/notes/upload",
          icon: Notebook,
        },
        { label: "View", href: "/teacher/academic/notes/view", icon: Eye },
        {
          label: "Mark Attendance",
          href: "/teacher/academic/attendance/mark",
          icon: Eye,
        },
        {
          label: "View Attendance",
          href: "/teacher/academic/attendance/view",
          icon: Eye,
        },
      ],
    },
{
      group: "Exams",
      children: [
        {
          label: "View",
          href: "/teacher/exams/view",
          icon: Notebook,
        },
       
      ],
    },
    {
      group: "Settings",
      children: [
        {
          label: "Change Password",
          href: "/teacher/settings/password/change",
          icon: Notebook,
        },
        {
          label: "Logout",
          href: "/teacher/settings/password/change",
          icon: LogOut,
        },
      ],
    },

        {
      group: "Notifications",
      children: [
        {
          label: "Publish",
          href: "/teacher/notifications/add",
          icon: Notebook,
        },
        {
          label: "Logout",
          href: "#",
          icon: LogOut,
        },
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
                  {item.children.map((child) =>
                    child.label === "Logout" ? (
                      <li key={child.label}>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors w-full text-left"
                        >
                          <child.icon size={16} />
                          <span>{child.label}</span>
                        </button>
                      </li>
                    ) : (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                        >
                          <child.icon size={16} />
                          <span>{child.label}</span>
                        </Link>
                      </li>
                    )
                  )}
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
