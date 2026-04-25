import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getPostById, updatePostUpvotes } from "../services/postsService";
import {
  getCommentsByPostId,
  createComment,
} from "../services/commentsService";

const PostDetail = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentSecretKey, setCommentSecretKey] = useState("");

  const handleUpvote = async () => {
    try {
      const updatedPost = await updatePostUpvotes(id, post.upvotes + 1);
      setPost(updatedPost);
    } catch (error) {
      console.error(error);
    }
  };

const handleCreateComment = async (event) => {
  event.preventDefault();

  if (!commentText.trim() || !commentSecretKey.trim()) return;

  try {
    const newComment = await createComment({
      post_id: id,
      text: commentText,
      secret_key: commentSecretKey,
    });

    setComments([...comments, newComment]);
    setCommentText("");
    setCommentSecretKey("");
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await getPostById(id);
        setPost(postData);
        const commentsData = await getCommentsByPostId(id);
        setComments(commentsData);
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

      <button onClick={handleUpvote}>Upvote</button>
      <p>Upvotes: {post.upvotes}</p>

      <Link to={`/posts/${post.id}/edit`}>Edit Post</Link>
      <section>
        <h2>Comments</h2>

        {comments.length === 0 ? (
          <p>No comments yet. Be the first to reply.</p>
        ) : (
          comments.map((comment) => (
            <article key={comment.id}>
              <p>{comment.text}</p>
              <small>{new Date(comment.created_at).toLocaleString()}</small>
            </article>
          ))
        )}

        <form onSubmit={handleCreateComment}>
          <label htmlFor="commentText">Add a comment</label>
          <textarea
            id="commentText"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
          />

          <label htmlFor="commentSecretKey">Secret Key</label>
          <input
            id="commentSecretKey"
            type="password"
            value={commentSecretKey}
            onChange={(event) => setCommentSecretKey(event.target.value)}
          />

          <button type="submit">Add Comment</button>
        </form>
      </section>
    </section>
  );
};

export default PostDetail;
