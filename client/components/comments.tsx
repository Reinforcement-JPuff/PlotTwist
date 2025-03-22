import React, { use, useState } from "react";
import { usePostCommentMutation, useGetCommentsQuery } from "../features/apiSlice";
interface CommentsProps {
  storyID: number;
}

const Comments: React.FC<CommentsProps> = ({ storyID }) => {
  const [newComment, setNewComment] = useState("");
  const [username] = useState("Guest");

  const {
    data:  comments = [],
    isLoading,
    isError,
    refetch,
  } = useGetCommentsQuery(storyID);
  
  const [ postComment, { isLoading: isPosting }] = usePostCommentMutation();

  const handleAddComment = async () => {
    if (!newComment.trim()) return;  
    try {
      await postComment({ storyId : storyID, username, text: newComment}).unwrap();
      setNewComment("");
      refetch();
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <div
        style={{
          maxHeight: "150px",
          overflowY: "auto",
          border: "1px solid black",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {isLoading ? (
          <p>Loading comments...</p>
        ) : isError ? (
          <p style={{ color: "red" }}>Failed to load comments</p>
        ) : comments.length === 0 ? (
          <p>No comments yet. Be the first!</p>
        ) : (
          comments.map((c) => (
            <p key={c.id}>
              <strong>{c.username}:</strong> {c.text}
            </p>
          ))
        )}
      </div>

      <input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Leave a comment"
        style={{ width: "60%" }}
      />
      <button onClick={handleAddComment} disabled={isPosting}>
        {isPosting ? "Posting..." : "+"}
      </button>
    </div>
  );
};

export default Comments;