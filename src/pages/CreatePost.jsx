import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createPost, getAllPosts } from "../services/postsService";

const CreatePost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    video_url: "",
    tag: "Question",
    secret_key: "",
    referenced_post_id: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availablePosts, setAvailablePosts] = useState([]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!formData.title.trim()) {
      setErrorMessage("Title is required.");
      return;
    }

    if (!formData.secret_key.trim()) {
      setErrorMessage("Secret key is required.");
      return;
    }

    try {
      setIsSubmitting(true);
      await createPost({
        ...formData,
        referenced_post_id: formData.referenced_post_id || null,
      });
      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.code === "23503") {
        setErrorMessage(
          "The referenced post does not exist. Please choose a valid post."
        );
      } else {
        setErrorMessage("There was a problem creating the post.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const loadAvailablePosts = async () => {
      try {
        const posts = await getAllPosts();
        const sortedPosts = posts.sort((a, b) => a.id - b.id);
        setAvailablePosts(sortedPosts);
      } catch (error) {
        console.error(error);
        setErrorMessage("There was a problem loading available posts.");
      }
    };

    loadAvailablePosts();
  }, []);

  return (
    <section>
      <h1>Create Post</h1>
      {errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
        />

        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
        />
        <label htmlFor="video_url">Video URL</label>
        <input
          id="video_url"
          name="video_url"
          type="url"
          value={formData.video_url}
          onChange={handleChange}
        />

        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
        >
          <option value="Question">Question</option>
          <option value="Advice">Advice</option>
          <option value="Experience">Experience</option>
          <option value="Resource">Resource</option>
          <option value="Warning">Warning</option>
        </select>

        <label htmlFor="secret_key">Secret Key</label>
        <input
          id="secret_key"
          name="secret_key"
          type="password"
          value={formData.secret_key}
          onChange={handleChange}
          required
        />
        <label htmlFor="referenced_post_id">Referenced Post</label>
        <select
          id="referenced_post_id"
          name="referenced_post_id"
          value={formData.referenced_post_id}
          onChange={handleChange}
        >
          <option value="">No referenced post</option>

          {availablePosts.map((post) => (
            <option key={post.id} value={post.id}>
              #{post.id} - {post.title}
            </option>
          ))}
        </select>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
