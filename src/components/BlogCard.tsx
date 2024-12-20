import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative bg-card rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/post/${post.id}`}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-[16/9] md:aspect-square relative overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6 md:pr-8 flex flex-col justify-center">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground">
                {post.category}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              {post.date}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
