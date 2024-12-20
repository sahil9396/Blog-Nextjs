"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  pathList: {
    href: string;
    text: string;
  }[];
};

export default function Navbar({ pathList }: Props) {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b flex flex-col gap-4 py-4 md:px-4 ">
      <div className="w-full mx-auto px-4 md:px-0 ">
        <div className="flex justify-between items-center ">
          <Link
            href="/"
            className=" w-fit text-2xl text-center md:text-start font-bold font-mono "
          >
            Astro-<span className="text-primary text-yellow-500">Art</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLinks pathList={pathList} />
          </div>
        </div>
      </div>

      <div className="flex md:hidden justify-evenly items-center ">
        <NavLinks pathList={pathList} mobile />
      </div>
    </nav>
  );
}

function NavLinks({
  pathList,
  mobile = false,
}: {
  pathList: {
    href: string;
    text: string;
  }[];
  mobile?: boolean;
}) {
  const path = usePathname();
  const linkClass = mobile
    ? "block p-2 bg-gray-100 rounded-md text-base font-medium hover:bg-accent  whitespace-nowrap"
    : "text-foreground/60 hover:text-foreground transition-colors";

  return (
    <>
      {pathList.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            linkClass + (path === item.href ? " text-primary underline" : "")
          }
        >
          {item.text}
        </Link>
      ))}
    </>
  );
}
