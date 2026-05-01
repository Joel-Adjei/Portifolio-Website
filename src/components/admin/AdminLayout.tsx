import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  HiFolder,
  HiChatAlt2,
  HiLogout,
  HiMenu,
  HiX,
  HiChevronLeft,
} from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useMe, useLogout, useMessages } from "@/hooks/queries";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin/dashboard", icon: MdDashboard, label: "Dashboard" },
  { to: "/admin/projects", icon: HiFolder, label: "Projects" },
  { to: "/admin/messages", icon: HiChatAlt2, label: "Messages" },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { data: user } = useMe(!!localStorage.getItem("adminToken"));
  const { mutate: logout } = useLogout();
  const { data: messages = [] } = useMessages(!!user);
  const unreadCount = messages.filter((m) => !m.read).length;

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/auth");
    }
  }, [navigate]);

  useEffect(() => {
    if (user === null) {
      localStorage.removeItem("adminToken");
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-30 flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Sidebar header */}
        <div
          className={cn(
            "flex items-center border-b border-border h-16 px-3",
            collapsed ? "justify-center" : "justify-between",
          )}
        >
          {!collapsed && (
            <span className="font-bold text-base tracking-tight truncate">
              Admin Panel
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent transition-colors shrink-0"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <HiChevronLeft
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                collapsed && "rotate-180",
              )}
            />
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent transition-colors"
          >
            <HiX className="h-5 w-5" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  collapsed && "justify-center",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span className="truncate">{label}</span>}
                  {label === "Messages" && unreadCount > 0 && (
                    <span
                      className={cn(
                        "bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center leading-none",
                        collapsed
                          ? "absolute -top-0.5 -right-0.5 w-4 h-4"
                          : "ml-auto w-5 h-5",
                        isActive && "bg-primary-foreground text-primary",
                      )}
                    >
                      {unreadCount}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sign out */}
        <div className={cn("p-2 border-t border-border")}>
          <button
            onClick={() => {
              logout(undefined, {
                onSuccess: () => {
                  localStorage.removeItem("adminToken");
                  navigate("/");
                },
              });
            }}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full",
              collapsed && "justify-center",
            )}
          >
            <HiLogout className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          collapsed ? "lg:ml-16" : "lg:ml-64",
        )}
      >
        {/* Mobile topbar */}
        <header className="flex items-center gap-4 border-b border-border px-4 h-16 lg:hidden bg-card">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Open menu"
          >
            <HiMenu className="h-5 w-5" />
          </button>
          <span className="font-bold">Admin Panel</span>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
