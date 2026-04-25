import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postsService";
import PostCard from "../components/ PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [tagFilter, setTagFilter] = useState("All");

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

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((post) => {
      if (tagFilter === "All") return true;
      return post.tag === tagFilter;
    })
    .sort((a, b) => {
      if (sortBy === "upvotes") {
        return b.upvotes - a.upvotes;
      }

      return new Date(b.created_at) - new Date(a.created_at);
    });

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

      <section>
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="upvotes">Most Upvoted</option>
        </select>

        <select
          value={tagFilter}
          onChange={(event) => setTagFilter(event.target.value)}
        >
          <option value="All">All Tags</option>
          <option value="Question">Question</option>
          <option value="Advice">Advice</option>
          <option value="Experience">Experience</option>
          <option value="Resource">Resource</option>
          <option value="Warning">Warning</option>
        </select>
      </section>

      {filteredPosts.length === 0 ? (
        <p>No posts yet. Be the first to share something.</p>
      ) : (
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </section>
  );
};

export default Home;
