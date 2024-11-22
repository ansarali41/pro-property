import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SuperAdminDashboard } from "@/components/dashboard/super-admin-dashboard";
import { OwnerDashboard } from "@/components/dashboard/owner-dashboard";
import { TenantDashboard } from "@/components/dashboard/tenant-dashboard";
import { MaintenanceDashboard } from "@/components/dashboard/maintenance-dashboard";
import { UserRole } from "@/lib/types";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const role = session.user.role as UserRole;

  const DashboardComponent = {
    [UserRole.SUPER_ADMIN]: SuperAdminDashboard,
    [UserRole.OWNER]: OwnerDashboard,
    [UserRole.TENANT]: TenantDashboard,
    [UserRole.MAINTENANCE]: MaintenanceDashboard,
  }[role];

  return <DashboardComponent />;
}