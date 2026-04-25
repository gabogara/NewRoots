import { useState } from "react";
import { useNavigate } from "react-router";
import { createPost } from "../services/postsService";

const CreatePost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    tag: "Question",
    secret_key: "",
    referenced_post_id: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.title.trim()) {
      setErrorMessage("Title is required.");
      return;
    }

    if (!formData.secret_key.trim()) {
      setErrorMessage("Secret key is required.");
      return;
    }

    try {
      await createPost({
        ...formData,
        referenced_post_id: formData.referenced_post_id || null,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("There was a problem creating the post.");
    }
  };

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
        <label htmlFor="referenced_post_id">Referenced Post ID</label>
        <input
          id="referenced_post_id"
          name="referenced_post_id"
          type="number"
          value={formData.referenced_post_id}
          onChange={handleChange}
          placeholder="Optional"
        />

        <button type="submit">Create Post</button>
      </form>
    </section>
  );
};

export default CreatePost;
