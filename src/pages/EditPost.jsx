import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { getPostById, updatePost, deletePost } from "../services/postsService";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [originalPost, setOriginalPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    video_url: "",
    tag: "Question",
  });
  const [secretKeyInput, setSecretKeyInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteSecretKey, setDeleteSecretKey] = useState("");

  const handleDeletePost = async () => {
    if (deleteSecretKey !== originalPost.secret_key) {
      setErrorMessage("Incorrect secret key.");
      return;
    }

    try {
      await deletePost(id);
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("There was a problem deleting the post.");
    }
  };

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await getPostById(id);
        setOriginalPost(postData);

        setFormData({
          title: postData.title || "",
          content: postData.content || "",
          image: postData.image || "",
          video_url: postData.video_url || "",
          tag: postData.tag || "Question",
        });
      } catch (error) {
        console.error(error);
        setErrorMessage("Post not found.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (secretKeyInput !== originalPost.secret_key) {
      setErrorMessage("Incorrect secret key.");
      return;
    }

    if (!formData.title.trim()) {
      setErrorMessage("Title is required.");
      return;
    }

    try {
      await updatePost(id, formData);
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error(error);
      setErrorMessage("There was a problem updating the post.");
    }
  };

  if (isLoading) {
    return <p>Loading post...</p>;
  }
  return (
    <section>
      <Link to={`/posts/${id}`}>Back to Post</Link>

      <h1>Edit Post</h1>
      {errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
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

        <label htmlFor="secretKeyInput">Secret Key</label>
        <input
          id="secretKeyInput"
          type="password"
          value={secretKeyInput}
          onChange={(event) => setSecretKeyInput(event.target.value)}
        />

        <button type="submit">Save Changes</button>
      </form>

      
    </section>
    
  );
};

export default EditPost;
