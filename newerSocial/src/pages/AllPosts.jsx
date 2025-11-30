import { useEffect, useState } from "react";
import service from "../appwrite/config";
import { PostCard, Container } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await service.getPosts();
        if (response?.documents) {
          setPosts(response.documents);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full px-4 py-6">
      <Container>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))
            ) : (
              <p className="text-gray-500">No posts available.</p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
