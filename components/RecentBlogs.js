"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const RecentBlogs = ({ blogs }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    if (blogs?.results) {
      setBlogData(blogs.results.slice(0, 4));
      setIsLoading(false);
    }
  }, [blogs]);

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
    <section className="py-12 px-4 max-w-7xl mx-auto mt-10">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-5xl tracking-tight font-extrabold leading-[1.2] md:leading-[1.2]">
          The Homebaba Insights
        </h2>
        <p className="text-gray-600 text-sm md:text-lg">
          Read our latest articles and never miss out on the latest trends in
          the real estate industry
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {!isLoading && blogData.length > 0 ? (
          blogData.map((blog) => (
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
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors leading-7 text-md">
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
          // Loading state - show skeleton cards
          [...Array(4)].map((_, index) => (
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
    </section>
  );
};

export default RecentBlogs;
