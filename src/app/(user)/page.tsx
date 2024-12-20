import SinglePostCard from "@/components/SinglePostCard";
import Sidebar from "@/components/Sidebar";
import { getPost } from "@/lib/getThings";
import { Card } from "@/components/ui/card";

export default async function Home() {
  const testData = await getPost();

  return (
    <>
      <div className="container min-h-screen mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-8">
            {testData.length === 0 ? (
              <div className="flex flex-col gap-6 p-4 md:px-8 md:py-4">
                <Card className="p-6">
                  <p className="text-center text-muted-foreground">
                    No posts or tags found
                  </p>
                </Card>
              </div>
            ) : (
              <>
                {testData.map((post) => (
                  <SinglePostCard
                    key={post.title}
                    id={post.id}
                    title={post.title}
                    date={post?.createdAt}
                    postDescription={post.body}
                    image={post.imageUrl}
                    category={post.tag.name}
                  />
                ))}
              </>
            )}
          </div>
          <div className="lg:col-span-4 sticky top-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
