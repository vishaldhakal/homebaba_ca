import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

async function getBlogPost(slug) {
  try {
    const res = await fetch(`https://api.homebaba.ca/api/posts/?slug=${slug}`, {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data.data?.results?.[0] || null;
  } catch (error) {
    return null;
  }
}

// Get related posts
async function getRelatedPosts(category) {
  try {
    const res = await fetch(`https://api.homebaba.ca/api/posts/?category=${category}&limit=4`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data?.results || [];
  } catch (error) {
    return [];
  }
}

export default async function BlogPost({ params }) {
  const blog = await getBlogPost(params.slug);
  
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="text-primary hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = await getRelatedPosts(blog.category?.slug);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
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
    <article className="max-w-7xl mx-auto px-4">
      {/* Back Link and Breadcrumbs */}
      <div className="flex justify-between items-center py-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Homebaba blogs
        </Link>
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-gray-700">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{blog.title}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-snug text-center max-w-4xl mx-auto">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-6 border-y border-gray-200 py-6">
          <div className="flex items-center gap-4">
            {blog.author?.profile_img && (
              <Image
                src={blog.author.profile_img}
                alt={blog.author.user?.first_name || "Author"}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div>
              <div className="font-medium">
                {blog.author?.user?.first_name} {blog.author?.user?.last_name}
              </div>
              <div className="text-gray-500 text-sm">
                {formatDate(blog.created_at)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Badge variant="secondary" className="text-sm">
              {blog.category?.name}
            </Badge>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{calculateReadTime(blog.content)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        <div 
          className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-20 mb-12">
          <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <Card className="group h-full hover:shadow-lg transition-all duration-300 overflow-hidden border-none shadow-xl rounded-xl">
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <Image
                      src={post.thumbnail_image || "/placeholder-blog.jpg"}
                      alt={post.thumbnail_image_alt_description || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 z-10 bg-white/30 backdrop-blur-md border border-white/50 text-white shadow-lg hover:bg-white/50 hover:text-white transition-colors duration-300 rounded-full">
                      {post.category?.name || "News"}
                    </Badge>
                  </div>

                  <CardHeader className="mb-0 pb-2 px-3">
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors leading-7 text-lg">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-3">
                    <CardDescription className="line-clamp-2 text-sm">
                      {post.meta_description}
                    </CardDescription>
                  </CardContent>

                  <CardFooter className="flex justify-between text-sm text-muted-foreground px-3">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{calculateReadTime(post.content)}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
