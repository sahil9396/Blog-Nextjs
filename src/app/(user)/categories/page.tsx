import { Card } from "@/components/ui/card";
import { getCategories } from "@/lib/getThings";
import Link from "next/link";

// const CATEGORIES = [
//   {
//     name: "Jyotish",
//     description: "Discover practices for living in the present moment",
//     count: 12,
//     image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
//   },
//   {
//     name: "Vaastu",
//     description: "Strategies and tools for effective work and life management",
//     count: 8,
//     image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
//   },
//   {
//     name: "Pooja Padh",
//     description: "Balance technology use with mental and physical health",
//     count: 6,
//     image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
//   },
//   {
//     name: "Remides For Everything",
//     description: "Resources for continuous self-improvement and development",
//     count: 10,
//     image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
//   },
// ];

export default async function CategoriesPage() {
  const CATEGORIES = await getCategories();
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {CATEGORIES.length === 0 && (
          <div className="flex flex-col gap-6 p-4 md:px-8 md:py-4">
            <Card className="p-6">
              <p className="text-center text-muted-foreground">
                No CATEGORIES found
              </p>
            </Card>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {CATEGORIES.map((category) => (
            <Link
              key={category.name}
              href={`/categories/${category.slug}`}
              className="group block"
            >
              <div className="bg-card rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="md:text-2xl font-serif font-bold group-hover:text-primary transition-colors">
                      {category.name}
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      {category._count.posts} articles
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
