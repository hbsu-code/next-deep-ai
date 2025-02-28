import { generateMetadata } from "../metadata";

export const metadata = generateMetadata(
  "Dashboard",
  "Upload and analyze your PDF documents to get instant summaries",
  ["dashboard", "upload", "analyze"],
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
