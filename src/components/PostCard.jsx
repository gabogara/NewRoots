import { Link } from "react-router";

const PostCard = ({ post }) => {
  return (
    <article>
      <p>{new Date(post.created_at).toLocaleString()}</p>
      <h2>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p>Tag: {post.tag || "General"}</p>
      <p>Upvotes: {post.upvotes}</p>
    </article>
  );
};

export default PostCard;
