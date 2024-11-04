import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const RecentBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: "The Future of Web Development",
      description:
        "Exploring upcoming trends and technologies that will shape the web development landscape in 2024. ",
      image: "/mira.png",
      category: "Technology",
      date: "Mar 15, 2024",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "The Future of Web Development",
      description:
        "Exploring upcoming trends and technologies that will shape the web development landscape in 2024. ",
      image: "/mira.png",
      category: "Technology",
      date: "Mar 15, 2024",
      readTime: "5 min read",
    },
    {
      id: 3,
      title: "The Future of Web Development",
      description:
        "Exploring upcoming trends and technologies that will shape the web development landscape in 2024. ",
      image: "/mira.png",
      category: "Technology",
      date: "Mar 15, 2024",
      readTime: "5 min read",
    },
    {
      id: 4,
      title: "The Future of Web Development",
      description:
        "Exploring upcoming trends and technologies that will shape the web development landscape in 2024. ",
      image: "/mira.png",
      category: "Technology",
      date: "Mar 15, 2024",
      readTime: "5 min read",
    },
  ];

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
        {blogs.map((blog) => (
          <Link href={`/blog/${blog.id}`} key={blog.id}>
            <Card className="group h-full hover:shadow-lg transition-all duration-300 overflow-hidden border-none shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 z-10 bg-white/30 backdrop-blur-md border border-white/50 text-white shadow-lg hover:bg-white/50 hover:text-white transition-colors duration-300 ">
                  {blog.category}
                </Badge>
              </div>

              <CardHeader className=" mb-0 pb-2 px-3">
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors leading-7 text-md">
                  {blog.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="px-3">
                <CardDescription className="line-clamp-3 text-sm">
                  {blog.description}
                </CardDescription>
              </CardContent>

              <CardFooter className="flex justify-between text-sm text-muted-foreground px-3">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{blog.readTime}</span>
                </div>
              </CardFooter>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
