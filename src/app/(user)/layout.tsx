import Navbar from "@/components/Navbar";

const pathList = [
  {
    href: "/",
    text: "Daily Upay",
  },
  {
    href: "/categories",
    text: "Categories",
  },
  {
    href: "/about",
    text: "About",
  },
  {
    href: "/contact",
    text: "Contact",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar pathList={pathList} />
      {children}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 MindfulBlog. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
