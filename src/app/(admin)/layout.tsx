import Navbar from "@/components/Navbar";
import { AdminProvider } from "@/providers/admin-provider";
import LoadData from "@/providers/LoadData";
import { Toaster } from "sonner";

const pathList = [
  {
    href: "/home",
    text: "Home",
  },
  {
    href: "/create-post",
    text: "Create",
  },
  {
    href: "/delete-post",
    text: "Delete",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <LoadData>
        <Navbar pathList={pathList} />
        {children}
        <footer className="bg-muted py-8">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>© 2024 MindfulBlog. All rights reserved.</p>
          </div>
        </footer>
        <Toaster />
      </LoadData>
    </AdminProvider>
  );
}
