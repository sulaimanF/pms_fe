"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { LayoutDashboard, Bell, ClipboardList, Store, FileText, ClipboardCheck, Users, Shield, Building2, Settings } from "lucide-react";

type NavLink = {
  icon: React.ElementType;
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
};

type NavSection = {
  title: string;
  items: NavLink[];
};

const navItems: NavSection[] = [
  {
    title: "",
    items: [
      { icon: LayoutDashboard, name: "Home", path: "/dashboard" },
      { icon: Bell, name: "Notification", path: "/notification" },
      { icon: ClipboardList, name: "Audit Trail", path: "/audit-trail" },
      { icon: Store, name: "Outlet", path: "/outlet" },
    ],
  },
  {
    title: "Kuesioner",
    items: [
      { icon: FileText, name: "Kuesioner", path: "/kuesioner" },
      { icon: ClipboardCheck, name: "Response", path: "/response" },
      { icon: Shield, name: "Review Kuesioner", path: "/review" },
    ],
  },
  {
    title: "Master Data",
    items: [
      { icon: Users, name: "User Management", path: "/user-management" },
      { icon: Building2, name: "Role Management", path: "/role-management" },
      { icon: Store, name: "Outlet Management", path: "/outlet-management" },
      { icon: Settings, name: "Parameter Penilaian", path: "/parameter-penilaian" },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const isActive = (path: string) => path === pathname;
  const showLabels = isExpanded || isHovered || isMobileOpen;

  return (
    <aside
      className={`fixed left-0 top-16 z-50 flex h-[calc(100vh-4rem)] flex-col border-r bg-[#0D5EF4] px-5 text-white transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 lg:top-0 lg:h-screen ${
        isExpanded || isMobileOpen || isHovered ? "w-[290px]" : "w-[90px]"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex py-8 ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {showLabels ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/btnn.png"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/btnn.png"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image src="/images/btn.svg" alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>

      <div className="mb-8 flex flex-col items-center">
        <div className="h-16 w-16 rounded-full bg-gray-300" />
        <h3 className="mt-3 text-sm font-bold text-white">M. Rafly Rivaldi</h3>
        <p className="text-xs text-blue-100">CXD</p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            {navItems.map((section) => (
              <div key={section.title || "menu"}>
                {section.title ? (
                  <h2
                    className={`mb-4 flex text-xs uppercase leading-[20px] text-gray-400 ${
                      !isExpanded && !isHovered
                        ? "lg:justify-center"
                        : "justify-start"
                    }`}
                  >
                    {section.title}
                  </h2>
                ) : null}

                <ul className="flex flex-col gap-4">
                  {section.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <li key={item.path}>
                        <Link
                          href={item.path}
                          className={`menu-item group ${
                            isActive(item.path)
                              ? "menu-item-active"
                              : "menu-item-inactive"
                          } ${
                            !isExpanded && !isHovered
                              ? "lg:justify-center"
                              : "lg:justify-start"
                          }`}
                        >
                          <span
                            className={`${
                              isActive(item.path)
                                ? "menu-item-icon-active"
                                : "menu-item-icon-inactive"
                            }`}
                          >
                            <Icon size={18} />
                          </span>

                          {showLabels && (
                            <span className="menu-item-text">
                              {item.name}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
