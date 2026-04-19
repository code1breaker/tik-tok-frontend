import { AppSidebar } from "@/src/components/app-sidebar";
import { SidebarProvider } from "@/src/components/ui/sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </main>
  );
}
