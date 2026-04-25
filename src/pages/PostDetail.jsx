import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getPostById } from "../services/postsService";

const PostDetail = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await getPostById(id);
        setPost(postData);
      } catch (error) {
        console.error(error);
        setErrorMessage("Post not found.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (isLoading) {
    return <p>Loading post...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <section>
      <Link to="/">Back to Home</Link>
      <p>{new Date(post.created_at).toLocaleString()}</p>
      <p>{post.tag || "General"}</p>

      <h1>{post.title}</h1>

      {post.content && <p>{post.content}</p>}

      {post.image && <img src={post.image} alt={post.title} />}

      {post.video_url && (
        <p>
          Video:{" "}
          <a href={post.video_url} target="_blank" rel="noreferrer">
            Watch video
          </a>
        </p>
      )}

      <p>Upvotes: {post.upvotes}</p>

      <Link to={`/posts/${post.id}/edit`}>Edit Post</Link>
    </section>
  );
};

export default PostDetail;
