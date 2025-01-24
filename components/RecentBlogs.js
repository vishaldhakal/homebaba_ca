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
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          The Homebaba Insights
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Read our latest articles and never miss out on the latest trends in
          the real estate industry
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {!isLoading && blogData.length > 0
          ? blogData.map((blog) => (
              <Link href={`/blog/${blog.slug}`} key={blog.slug}>
                <Card className="group h-full hover:shadow-none transition-all duration-300 overflow-hidden border-0 rounded-2xl">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={blog.thumbnail_image || "/placeholder-blog.jpg"}
                      alt={blog.thumbnail_image_alt_description || blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent"></div>
                    <Badge className="absolute top-4 left-4 z-10 bg-white/90 text-gray-800 shadow-sm hover:bg-white/95 transition-colors duration-300 rounded-full text-[10px] uppercase tracking-wide font-medium py-1">
                      {blog.category?.name || "News"}
                    </Badge>
                  </div>

                  <CardHeader className="pt-5 pb-2 px-4">
                    <CardTitle className="line-clamp-2 text-lg font-semibold leading-snug ">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>

                  <CardFooter className="flex justify-between text-xs text-gray-500 px-4 pt-2 pb-5">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span>{formatDate(blog.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{calculateReadTime(blog.content)}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))
          : [...Array(4)].map((_, index) => (
              <Card
                key={index}
                className="h-full border-0 shadow-none animate-pulse rounded-2xl overflow-hidden"
              >
                <div className="relative h-52 bg-gray-200"></div>
                <CardHeader className="pt-5 pb-2 px-4">
                  <div className="h-6 bg-gray-200 rounded-full w-3/4"></div>
                </CardHeader>
                <CardFooter className="px-4 pt-2 pb-5">
                  <div className="flex justify-between w-full">
                    <div className="h-4 bg-gray-200 rounded-full w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-1/4"></div>
                  </div>
                </CardFooter>
              </Card>
            ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
