
import { notFound } from "next/navigation";

/**
 * Admin Layout - Decommissioned.
 * All administrative interfaces are no longer accessible.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  notFound();
}
