"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const categories = [
  { name: "News", slug: "news" },
  { name: "Insights", slug: "insights" },
  { name: "Thorold", slug: "thorold" },
  { name: "Innisfil", slug: "innisfil" },
  { name: "Grimsby", slug: "grimsby" },
  { name: "Mississauga", slug: "mississauga" },
  { name: "Calgary", slug: "calgary" }
];

async function getBlogs() {
  try {
    const res = await fetch('https://api.homebaba.ca/api/posts/', {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!res.ok) {
      return { results: [] };
    }
    
    const data = await res.json();
    return data.data || { results: [] };
  } catch (error) {
    return { results: [] };
  }
}

export default function BlogListing() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    getBlogs().then((data) => {
      setBlogs(data.results || []);
      setIsLoading(false);
    });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateReadTime = (content) => {
    if (!content) return "5 min read";
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return `${readTime} min read`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Categories Navigation */}
      <nav className="mb-12 overflow-x-auto">
        <ul className="flex justify-start md:justify-start items-center min-w-max px-4">
          {categories.map((category, index) => {
            const isActive = pathname === `/blog/category/${category.slug}` || 
                           (pathname === '/blog' && category.slug === 'news');
            return (
              <li key={category.slug} className="flex items-center">
                <Link 
                  href={`/blog/category/${category.slug}`}
                  className={`
                    relative py-1 text-base font-medium transition-colors duration-200
                    ${isActive 
                      ? 'text-gray-900 border-b border-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'}
                  `}
                >
                  {category.name}
                </Link>
                {index < categories.length - 1 && (
                  <span className="mx-4 text-gray-300">•</span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Blog</h1>
        <p className="text-gray-600 text-lg">
          Stay updated with the latest insights in real estate
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {!isLoading ? (
          blogs.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug}>
              <Card className="group h-full hover:shadow-lg transition-all duration-300 overflow-hidden border-none shadow-xl rounded-xl">
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <Image
                    src={blog.thumbnail_image || "/placeholder-blog.jpg"}
                    alt={blog.thumbnail_image_alt_description || blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 z-10 bg-white/30 backdrop-blur-md border border-white/50 text-white shadow-lg hover:bg-white/50 hover:text-white transition-colors duration-300 rounded-full">
                    {blog.category?.name || "News"}
                  </Badge>
                </div>

                <CardHeader className="mb-0 pb-2 px-3">
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors leading-7 text-xl">
                    {blog.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-3">
                  <CardDescription className="line-clamp-3 text-sm">
                    {blog.meta_description}
                  </CardDescription>
                </CardContent>

                <CardFooter className="flex justify-between text-sm text-muted-foreground px-3">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>{formatDate(blog.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{calculateReadTime(blog.content)}</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          [...Array(6)].map((_, index) => (
            <Card key={index} className="h-full border-none shadow-xl animate-pulse rounded-xl">
              <div className="relative h-48 bg-gray-200 rounded-t-xl"></div>
              <CardHeader className="mb-0 pb-2 px-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent className="px-3">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </CardContent>
              <CardFooter className="px-3">
                <div className="flex justify-between w-full">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
