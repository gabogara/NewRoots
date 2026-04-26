import { supabase } from "./supabaseClient";

const getCommentsByPostId = async (postId) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

const createComment = async (comment) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([comment])
    .select()
    .single();

  if (error) throw error;
  return data;
};

const deleteComment = async (id) => {
  const { error } = await supabase.from("comments").delete().eq("id", id);

  if (error) throw error;
};

export { getCommentsByPostId, createComment, deleteComment };
