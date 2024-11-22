"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/lib/types";
import {
  BarChart3,
  Building,
  Users,
  Settings,
  FileText,
  Tool,
  CreditCard,
  MessageSquare,
} from "lucide-react";

interface DashboardSidebarProps {
  role: UserRole;
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();

  const roleBasedLinks = {
    [UserRole.SUPER_ADMIN]: [
      {
        href: "/dashboard",
        label: "Overview",
        icon: BarChart3,
      },
      {
        href: "/dashboard/users",
        label: "Users",
        icon: Users,
      },
      {
        href: "/dashboard/properties",
        label: "Properties",
        icon: Building,
      },
      {
        href: "/dashboard/subscriptions",
        label: "Subscriptions",
        icon: CreditCard,
      },
      {
        href: "/dashboard/settings",
        label: "Settings",
        icon: Settings,
      },
    ],
    [UserRole.OWNER]: [
      {
        href: "/dashboard",
        label: "Overview",
        icon: BarChart3,
      },
      {
        href: "/dashboard/properties",
        label: "My Properties",
        icon: Building,
      },
      {
        href: "/dashboard/tenants",
        label: "Tenants",
        icon: Users,
      },
      {
        href: "/dashboard/maintenance",
        label: "Maintenance",
        icon: Tool,
      },
      {
        href: "/dashboard/community",
        label: "Community",
        icon: MessageSquare,
      },
      {
        href: "/dashboard/subscription",
        label: "Subscription",
        icon: CreditCard,
      },
    ],
    [UserRole.TENANT]: [
      {
        href: "/dashboard",
        label: "Overview",
        icon: BarChart3,
      },
      {
        href: "/dashboard/lease",
        label: "Lease",
        icon: FileText,
      },
      {
        href: "/dashboard/maintenance",
        label: "Maintenance",
        icon: Tool,
      },
      {
        href: "/dashboard/community",
        label: "Community",
        icon: MessageSquare,
      },
      {
        href: "/dashboard/payments",
        label: "Payments",
        icon: CreditCard,
      },
    ],
    [UserRole.MAINTENANCE]: [
      {
        href: "/dashboard",
        label: "Overview",
        icon: BarChart3,
      },
      {
        href: "/dashboard/work-orders",
        label: "Work Orders",
        icon: Tool,
      },
      {
        href: "/dashboard/schedule",
        label: "Schedule",
        icon: FileText,
      },
    ],
  };

  const links = roleBasedLinks[role];

  return (
    <nav className="grid items-start gap-2">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link key={link.href} href={link.href}>
            <Button
              variant={pathname === link.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === link.href && "bg-muted font-medium"
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              {link.label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}