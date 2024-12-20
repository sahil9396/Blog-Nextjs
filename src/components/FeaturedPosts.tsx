import BlogCard from "./BlogCard";

const FEATURED_POSTS = [
  {
    id: 1,
    title: "The Art of Mindful Living",
    excerpt: "Discover how mindfulness can transform your daily life and bring more peace to your routine.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    date: "April 12, 2024",
    category: "Mindfulness",
  },
  {
    id: 2,
    title: "Finding Balance in a Digital World",
    excerpt: "Learn practical strategies for maintaining wellness while staying connected in our digital age.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    date: "April 10, 2024",
    category: "Digital Wellness",
  },
  {
    id: 3,
    title: "The Power of Morning Rituals",
    excerpt: "Create a morning routine that sets you up for success and enhances your productivity.",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8",
    date: "April 8, 2024",
    category: "Productivity",
  },
];

export default function FeaturedPosts() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-serif font-bold">Featured Posts</h2>
      <div className="grid gap-8">
        {FEATURED_POSTS.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}