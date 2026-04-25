import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postsService";
import PostCard from "../components/ PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsData = await getAllPosts();
        setPosts(postsData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (isLoading) {
    return <p>Loading community posts...</p>;
  }

  return (
    <section>
      <h1>NewRoots Community</h1>
      <p>
        A community forum for immigrants to share advice, questions, and
        experiences.
      </p>
      {posts.length === 0 ? (
      <p>No posts yet. Be the first to share something.</p>
      ) : ( posts.map((post) => <PostCard key={post.id} post={post} />) )}
    </section>
  );
};

export default Home;
