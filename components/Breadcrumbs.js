"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

export default function Breadcrumbs({ className, ...props }) {
  const pathname = usePathname();

  // Skip rendering breadcrumbs on home page
  if (pathname === "/") return null;

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSegments.length - 1;
    const title =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

    return {
      href,
      title,
      isLast,
    };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center space-x-2 text-sm text-muted-foreground mb-3",
        className
      )}
      {...props}
    >
      <Link
        href="/"
        className="hover:text-foreground transition-colors duration-200 flex items-center"
      >
        Home
      </Link>

      {breadcrumbItems
        .filter(({ href, title }) => {
          // Skip "category" segment in blog category pages
          if (href.includes("/blog/category/")) {
            return title !== "Category";
          }
          return true;
        })
        .map(({ href, title, isLast }, index) => {
          // For blog category pages, modify the href to point to /blog for the Blog link
          if (href.includes("/blog/category/")) {
            href = "/blog";
          }

          return (
            <div key={href} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1" />
              {isLast ? (
                <span className="font-medium text-foreground">{title}</span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  {title}
                </Link>
              )}
            </div>
          );
        })}
    </nav>
  );
}
