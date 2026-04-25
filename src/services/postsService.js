import { supabase } from "./supabaseClient";

const getAllPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

const createPost = async (post) => {
  const { data, error } = await supabase
    .from("posts")
    .insert([post])
    .select()
    .single();

  if (error) throw error;
  return data;
};

const getPostById = async (id) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

const updatePost = async (id, updatedPost) => {
  const { data, error } = await supabase
    .from("posts")
    .update(updatedPost)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

const updatePostUpvotes = async (id, upvotes) => {
  const { data, error } = await supabase
    .from("posts")
    .update({ upvotes })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export { getAllPosts, createPost, getPostById, updatePost, updatePostUpvotes };
